package com.hidekioka.util;

import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hidekioka.exception.LambdaException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.*;
import java.util.*;
import java.util.stream.Collectors;

public class LocalUtils {

    public static final String LINE_BREAK = "<br/>" + System.lineSeparator();
    static final String DEFAULT_URL = "jdbc:postgresql://postgres.ceuekxnc0ork.sa-east-1.rds.amazonaws"
            + ".com:5432/postgres";
    static final String DEFAULT_USER = "postgres";
    static final String DEFAULT_PASSWORD = "postgres";
    static String version = "";

    public static String getApplicationVersion() {
        if (version.isEmpty()) {
            try {
                Properties properties = new Properties();
                properties.load(LocalUtils.class.getClassLoader().getResourceAsStream("application.properties"));
                version = properties.getProperty("app.version");
            } catch (IOException e) {
                // Could not load version
            }
        }
        return version;
    }

    private LocalUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static void logWithClass(String classDesc, LambdaLogger logger, String text) {
        logger.log("[" + classDesc + "] " + text);
    }

    public static String textWithVersion(String version, String text) {
        return "[" + version + "] " + LINE_BREAK + text;
    }

    public static String getEmailFromToken(String token) throws LambdaException {
        try {
            URL url = new URL("https://lambda-notes.auth.sa-east-1.amazoncognito.com/oauth2/userInfo");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestProperty("Authorization", "Bearer " + token);
            conn.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String output;

            StringBuffer response = new StringBuffer();
            while ((output = in.readLine()) != null) {
                response.append(output);
            }

            in.close();
            Map<String, Object> outputMap = new ObjectMapper().readValue(response.toString(),
                    new TypeReference<Map<String, Object>>() {
                    });
            return outputMap.get("email").toString();
        } catch (Exception e) {
            throw new LambdaException("Error validating token", e);
        }
    }


    public static APIGatewayProxyResponseEvent buildResponse() {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        // CORS in the backend: https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html
        //		headers.put("Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,
        //		X-Amz-Security-Token");
        headers.put("Access-Control-Allow-Headers", "*");
        headers.put("Access-Control-Allow-Methods", "*");
        headers.put("Access-Control-Allow-Origin", "*");

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent().withHeaders(headers);
        return response;
    }

    public static APIGatewayProxyResponseEvent buildErrorResponse(APIGatewayProxyResponseEvent response, Exception
            e) {
        JSONObject body = new JSONObject();
        body.append("app-version", LocalUtils.getApplicationVersion());
        body.append("message", e.getMessage());
        return response.withBody(body.toString()).withStatusCode(HttpURLConnection.HTTP_INTERNAL_ERROR);
    }

    public static Connection connect() throws SQLException {
        String dbUrl = System.getenv("DB_URL");
        String dbUser = System.getenv("DB_USER");
        String dbPassword = System.getenv("DB_PASSWORD");
        Connection conn = DriverManager.getConnection(dbUrl != null && !dbUrl.isBlank() ? dbUrl : DEFAULT_URL,
                dbUser != null && !dbUser.isBlank() ? dbUser : DEFAULT_USER,
                dbPassword != null && !dbPassword.isBlank() ? dbPassword : DEFAULT_PASSWORD);
        return conn;
    }

    public static List<Map<String, Object>> findAllDB(String table) throws LambdaException {
        return findAllDB(table, null);
    }

    public static List<Map<String, Object>> findAllDB(String table, Map.Entry<String, Object> whereParam) throws
            LambdaException {
        List<Map<String, Object>> resultList = new ArrayList<>();
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        try {
            con = LocalUtils.connect();
            String whereClause = whereParam != null ? " where " + whereParam.getKey() + " = ? " : "";
            String query = "select * from " + table + whereClause + " order by id";
            stmt = con.prepareStatement(query);
            if (whereParam != null) {
                if (whereParam.getValue() instanceof String) {
                    stmt.setString(1, whereParam.getValue().toString());
                }
            }
            rs = stmt.executeQuery();
            ResultSetMetaData metaData = rs.getMetaData();
            Integer columnCount = metaData.getColumnCount();
            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    row.put(metaData.getColumnName(i), rs.getObject(i));
                }
                resultList.add(row);
            }
        } catch (SQLException e) {
            throw new LambdaException(e.getMessage(), e);
        } finally {
            LocalUtils.closeQuietly(rs);
            LocalUtils.closeQuietly(stmt);
            LocalUtils.closeQuietly(con);
        }
        return resultList;
    }

    public static void insertDB(String table, Map<String, Object> params) throws LambdaException {
        Connection con = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        try {
            con = LocalUtils.connect();
            String keys = params.entrySet().stream().map(Map.Entry::getKey).collect(Collectors.joining(","));
            String questionMarks = params.entrySet().stream().map(a -> "?").collect(Collectors.joining(","));
            stmt = con.prepareStatement("insert into " + table + " ( " + keys + " ) values (" + questionMarks +
                    ")");
            int count = 1;
            for (Object value : params.values()) {
                stmt.setString(count, value.toString());
                count++;
            }
            System.err.print("insert into " + table + " ( " + questionMarks + " ) values (" + questionMarks + ")");
            System.err.print(stmt.getMetaData());
            System.err.print(stmt.getParameterMetaData());
            System.err.print(stmt);

            stmt.executeUpdate();

        } catch (SQLException e) {
            throw new LambdaException(e.getMessage(), e);
        } finally {
            LocalUtils.closeQuietly(rs);
            LocalUtils.closeQuietly(stmt);
            LocalUtils.closeQuietly(con);
        }
    }

    public static void removeDB(String table) throws LambdaException {
        removeDB(table, "1=1");
    }

    public static void removeDB(String table, String whereClause) throws LambdaException {
        Connection con = null;
        Statement stmt = null;
        ResultSet rs = null;
        try {
            con = LocalUtils.connect();
            stmt = con.createStatement();
            String deleteClause = "delete from " + table + " where " + whereClause;
            stmt.executeUpdate(deleteClause);
        } catch (SQLException e) {
            throw new LambdaException(e.getMessage(), e);
        } finally {
            LocalUtils.closeQuietly(rs);
            LocalUtils.closeQuietly(stmt);
            LocalUtils.closeQuietly(con);
        }
    }

    public static void updateDB(String table, Map.Entry<String, String> param, String whereClause)
            throws LambdaException {
        Connection con = null;
        Statement stmt = null;
        ResultSet rs = null;
        try {
            con = LocalUtils.connect();
            stmt = con.createStatement();
            String updateClause = "update " + table + " set " + param.getKey() + " = '" + param.getValue() + "' " +
                    "where"
                    + " " + whereClause;
            stmt.executeUpdate(updateClause);
        } catch (SQLException e) {
            throw new LambdaException(e.getMessage(), e);
        } finally {
            LocalUtils.closeQuietly(rs);
            LocalUtils.closeQuietly(stmt);
            LocalUtils.closeQuietly(con);
        }
    }

    public static void closeQuietly(ResultSet rs) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                /* Ignored */
            }
        }
    }

    public static void closeQuietly(Statement stmt) {
        if (stmt != null) {
            try {
                stmt.close();
            } catch (SQLException e) {
                /* Ignored */
            }
        }
    }

    public static void closeQuietly(Connection con) {
        if (con != null) {
            try {
                con.close();
            } catch (SQLException e) {
                /* Ignored */
            }
        }
    }
}