package sample.Controllers;

import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.ResourceBundle;

import javafx.beans.Observable;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.chart.CategoryAxis;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.StackedBarChart;
import javafx.scene.chart.XYChart;
import javafx.scene.control.*;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.util.StringConverter;
import sample.DatabaseConnection;
import sample.ModelClasses.*;

public class PlansPageController {

    private DatabaseConnection dbConn;

    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;

    @FXML
    private AnchorPane plansAnchorPane;

    @FXML
    private TableView<?> opersTab;

    @FXML
    private TableColumn<?, ?> operIDCol;

    @FXML
    private TableColumn<?, ?> operNameCol;

    @FXML
    private TableColumn<?, ?> operDurationCol;

    @FXML
    private TableColumn<?, ?> reqNameCol;

    @FXML
    private TableColumn<?, ?> devNameCol;

    @FXML
    private TableColumn<?, ?> devOrderCol;

    @FXML
    private Button loadPlanBtn;

    @FXML
    private Button savePlanBtn;

    @FXML
    private ComboBox<PlansModel> plansList;

    @FXML
    private Button deletePlanBtn;

    @FXML
    private TextField planNameField;

    @FXML
    private TextField planTimeStartField;

    @FXML
    private ComboBox<String> algorithmsList;

    @FXML
    private Button updatePlanBtn;

    @FXML
    private Button addReqBtn;

    @FXML
    private Button deleteReqBtn;

    @FXML
    private Button updateReqBtn;

    @FXML
    private ComboBox<ReqsModel> reqList;

    @FXML
    private StackedBarChart<Number, String> stackedBarChart;

    @FXML
    private CategoryAxis x;

    @FXML
    private NumberAxis y;

    @FXML
    private Label errLabel;



    @FXML
    void addReqInPlan(ActionEvent event) {

    }

    @FXML
    void clearFieldsEvent(MouseEvent event) {

    }

    @FXML
    void deletePlan(ActionEvent event) {

    }

    @FXML
    void deleteReqInPlan(ActionEvent event) {

    }

    @FXML
    void loadPlan(ActionEvent event) {

    }

    @FXML
    void rowSelect(MouseEvent event) {

    }

    @FXML
    void savePlan(ActionEvent event) {

    }

    @FXML
    void updateReqInPlan(ActionEvent event) {

    }

    @FXML
    void initialize() {
        dbConn = new DatabaseConnection();
        ObservableList<String> algsList = FXCollections.observableArrayList();
        algsList.addAll("Джонсон", "Генетический", "Метод");
        algorithmsList.setItems(algsList);
    }

    private void fillPlansList(){
        UserModel userModel = UserDataTransfer.getInstance().getUserModel();
        String sqlSelectQuery = "SELECT * FROM plans_view WHERE User_ID = " + userModel.getUser_ID();
        ObservableList<PlansModel> plansObsList = null;
        plansObsList = selectData(plansObsList, sqlSelectQuery, "1");
        plansList.setItems(null);
        plansList.setItems(plansObsList);
        plansList.setConverter(new StringConverter<PlansModel>() {
            @Override
            public String toString(PlansModel plansModel) {
                if(plansModel == null)
                    return null;
                else
                    return plansModel.getPlan_Name() + " (" + plansModel.getPlan_Creation_Time() + ")";
            }

            @Override
            public PlansModel fromString(String s) {
                return null;
            }
        });
    }

    private void fillDetailsList(){
        String sqlSelectQuery = "SELECT * FROM requirments WHERE requirments.Req_ID IN (SELECT operations_view.Req_ID FROM operations_view)";
        ObservableList<DevicesModel> reqsObsList = null;
        reqsObsList = selectData(reqsObsList, sqlSelectQuery, "2");
        reqList.setItems(null);
        reqList.setConverter(new StringConverter<ReqsModel>() {
            @Override
            public String toString(ReqsModel reqsModel) {
                if(reqsModel == null)
                    return null;
                else
                    return reqsModel.getReq_Name();
            }

            @Override
            public ReqsModel fromString(String s) {
                return null;
            }
        });

    }

    private ObservableList selectData(ObservableList dataList, String sqlSelectQuery, String code)
    {
        dataList = null;
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            conn = dbConn.getDbConnection();
            dataList = FXCollections.observableArrayList();
            ps = conn.prepareStatement(sqlSelectQuery);
            rs = ps.executeQuery();
            switch (code)
            {
                case "1": {
                    while (rs.next()) {
                        dataList.add(new PlansModel(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getInt(4), rs.getString(5)));
                    }
                    break;
                }
                case "2":{
                    while (rs.next()) {
                        dataList.add(new ReqsModel(rs.getInt(1), rs.getString(2), rs.getString(3)));
                    }
                    break;
                }
                case "3":{
                    while (rs.next()) {
                        dataList.add(new OpersModel(rs.getInt(1), rs.getString(2), rs.getInt(3), rs.getString(4), rs.getDouble(5), rs.getInt(6), rs.getString(7), rs.getInt(8)));
                    }
                    break;
                }
                default:{
                    break;
                }
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
        return dataList;
    }
}
