package sample.Controllers;

import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ResourceBundle;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import sample.ModelClasses.ReqsModel;
import sample.DatabaseConnection;
import sample.ModelClasses.UserDataTransfer;
import sample.ModelClasses.UserModel;

public class ReqsPageController {

    private DatabaseConnection dbConn;

    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;

    @FXML
    private AnchorPane reqAnchorPane;

    @FXML
    private TableView<ReqsModel> reqsTab;

    @FXML
    private TableColumn<ReqsModel, Integer> reqIDCol;

    @FXML
    private TableColumn<ReqsModel, String> reqCodeCol;

    @FXML
    private TableColumn<ReqsModel, String> reqNameCol;

    @FXML
    private Button addReqBtn;

    @FXML
    private Button deleteReqBtn;

    @FXML
    private Button updateReqBtn;

    @FXML
    private TextField codeReqField;

    @FXML
    private TextField nameReqField;

    @FXML
    private Label errLabel;

    @FXML
    void clearFieldsEvent(MouseEvent event) {
        int count = event.getClickCount();
        if (count == 2)
            clearFields();
    }

    private void clearFields() {
        errLabel.setText("");
        codeReqField.clear();
        nameReqField.clear();
        addReqBtn.setDisable(false);
        deleteReqBtn.setDisable(true);
        updateReqBtn.setDisable(true);
    }

    @FXML
    void rowSelect(MouseEvent event) {
        addReqBtn.setDisable(true);
        ReqsModel rmt = reqsTab.getSelectionModel().getSelectedItem();
        if (rmt == null)
            return;
        codeReqField.setText(rmt.getReq_Code());
        nameReqField.setText(rmt.getReq_Name());
        updateReqBtn.setDisable(false);
        deleteReqBtn.setDisable(false);
    }

    @FXML
    void addReq(ActionEvent event) {
        String codeReq = codeReqField.getText();
        String nameReq = nameReqField.getText();
        if(codeReq.equals("") || nameReq.equals("")){
            errLabel.setText("Заполните пустые поля");
            return;
        }
        String sqlInsertQuery = "INSERT INTO requirments (Req_Code, Req_Name) VALUES (?, ?)";
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = dbConn.getDbConnection();
            ps = conn.prepareStatement(sqlInsertQuery);
            ps.setString(1, codeReq);
            ps.setString(2, nameReq);
            ps.executeUpdate();
        }catch (SQLException er){
            errLabel.setText("Ошибка добавления данных");
            er.printStackTrace();
        }
        finally {
            try {
                ps.close();
                conn.close();
            } catch (SQLException e) {
                errLabel.setText("Ошибка добавления данных");
                e.printStackTrace();
            }
        }
        clearFields();
        loadReqData();
    }

    @FXML
    void deleteReq(ActionEvent event) {
        ReqsModel rmt = reqsTab.getSelectionModel().getSelectedItem();
        if (rmt.equals(null)){
            errLabel.setText("Выберите данные для удаления");
            return;
        }
        String sqlDeleteQuery = "DELETE  FROM requirments WHERE Req_ID = ?";
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = dbConn.getDbConnection();
            ps = conn.prepareStatement(sqlDeleteQuery);
            ps.setInt(1, rmt.getReq_ID());
            ps.executeUpdate();
        }catch (SQLException er){
            errLabel.setText("Ошибка удаления данных");
            er.printStackTrace();
        }
        finally {
            try {
                ps.close();
                conn.close();
            } catch (SQLException e) {
                errLabel.setText("Ошибка удаления данных");
                e.printStackTrace();
            }
        }
        clearFields();
        loadReqData();
    }


    @FXML
    void updateReq(ActionEvent event) {
        ReqsModel rmt = reqsTab.getSelectionModel().getSelectedItem();
        String codeReq = codeReqField.getText();
        String nameReq = nameReqField.getText();
        if(codeReq.equals("") || nameReq.equals("") || rmt.equals(null)){
            errLabel.setText("Заполните пустые поля");
            return;
        }
        String sqlUpdateQuery = "UPDATE requirments SET Req_Code = ?, Req_Name = ? WHERE Req_ID = ?";
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = dbConn.getDbConnection();
            ps = conn.prepareStatement(sqlUpdateQuery);
            ps.setString(1, codeReq);
            ps.setString(2, nameReq);
            ps.setInt(3, rmt.getReq_ID());
            ps.executeUpdate();
        }catch (SQLException er){
            errLabel.setText("Ошибка обновления данных");
            er.printStackTrace();
        }
        finally {
            try {
                ps.close();
                conn.close();
            } catch (SQLException e) {
                errLabel.setText("Ошибка обновления данных");
                e.printStackTrace();
            }
        }
        clearFields();
        loadReqData();
    }

    @FXML
    void initialize() {
        dbConn = new DatabaseConnection();
        deleteReqBtn.setDisable(true);
        updateReqBtn.setDisable(true);
        loadReqData();
    }

    private void loadReqData() {
        String sqlSelectQuery = "SELECT * FROM requirments";
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        ObservableList<ReqsModel> reqData = null;
        try {
            conn = dbConn.getDbConnection();
            reqData = FXCollections.observableArrayList();
            ps = conn.prepareStatement(sqlSelectQuery);
            rs = ps.executeQuery();
            while (rs.next()){
                reqData.add(new ReqsModel(rs.getInt(1), rs.getString(2), rs.getString(3)));
            }
        }catch (SQLException er){
            errLabel.setText("Ошибка загрузки данных");
            er.printStackTrace();
        }
        finally {
            try {
                rs.close();
                ps.close();
                conn.close();
            } catch (SQLException e) {
                errLabel.setText("Ошибка загрузки данных");
                e.printStackTrace();
            }
        }
        errLabel.setText("");
        reqIDCol.setCellValueFactory(new PropertyValueFactory<ReqsModel, Integer>("req_ID"));
        reqCodeCol.setCellValueFactory(new PropertyValueFactory<ReqsModel, String>("req_Code"));
        reqNameCol.setCellValueFactory(new PropertyValueFactory<ReqsModel, String>("req_Name"));
        reqsTab.setItems(null);
        reqsTab.setItems(reqData);
    }
}
