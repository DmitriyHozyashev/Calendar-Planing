package sample.Controllers;

import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

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
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.util.StringConverter;
import sample.DatabaseConnection;
import sample.Methods;
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
    private TableView<OpersModel> opersTab;

    @FXML
    private TableColumn<OpersModel, Integer> operIDCol;

    @FXML
    private TableColumn<OpersModel, String> operNameCol;

    @FXML
    private TableColumn<OpersModel, String> reqNameCol;

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
    private DatePicker planTimeStartField;

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
    private Button calculateBtn;

    @FXML
    private ComboBox<ReqsModel> reqList;

    @FXML
    private TableView<String> comparisonTab;

    @FXML
    private TableColumn<String, String> algNameCol;

    @FXML
    private TableColumn<String, String> executionTimeCol;

    @FXML
    private TableColumn<String, String> planTimeCol;

    @FXML
    private TableColumn<String, String> deviceNumbCol;

    @FXML
    private TableColumn<String, String> reqNumberCol;

    @FXML
    private StackedBarChart<Number, String> stackedBarChart;

    @FXML
    private CategoryAxis x;

    @FXML
    private NumberAxis y;

    @FXML
    private Label errLabel;

    private TreeMap<String,TreeMap<String, OpersModel>> operationsCategory;
    private ArrayList<ArrayList<OpersModel>> mapList;
    private Set<String> deviceSet;
    private Set<String> reqSet;

    @FXML
    void addOperInPlan(ActionEvent event) {
        ReqsModel rqm = reqList.getSelectionModel().getSelectedItem();
        if (rqm == null){
            errLabel.setText("Вывберите деталь для добавления");
            return;
        }
        String sqlSelectQuery = "SELECT * FROM operations_view WHERE Req_ID = " + rqm.getReq_ID() + " ORDER BY 8";
        ObservableList<OpersModel> opersObs = null;
        opersObs = selectData(opersObs, sqlSelectQuery, "2");
        for (OpersModel opm : opersObs){
            deviceSet.add(opm.getDevice_Name());
            reqSet.add(opm.getReq_Name());
            operationsCategory.putIfAbsent(opm.getDevice_Name(), new TreeMap<>());
            operationsCategory.get(opm.getDevice_Name()).putIfAbsent(opm.getReq_Name(), opm);
        }
    }

    private void fillAndTransformMap (){
        TreeMap<String, TreeMap<String, OpersModel>> mapCopy = new TreeMap<>(operationsCategory);
        for (String device : deviceSet) {
            mapCopy.putIfAbsent(device, new TreeMap<>());
            for (String req : reqSet)
                mapCopy.get(device).putIfAbsent(req, null);
        }
        mapList = new ArrayList<>();
        for (String key : mapCopy.keySet())
            mapList.add(new ArrayList<>(mapCopy.get(key).values()));
    }

    @FXML
    void calculateBtn(ActionEvent event) {
        fillAndTransformMap();
        Methods mt = new Methods();
        mt.minMaxLabor(mapList, 1);
    }

    @FXML
    void deleteReqInPlan(ActionEvent event) {
    }

    @FXML
    void updateReqInPlan(ActionEvent event) {
    }

    @FXML
    void clearFieldsEvent(MouseEvent event) {
        clearFields();
    }

    private void clearFields(){
        errLabel.setText("");
        deleteReqBtn.setDisable(true);
        updateReqBtn.setDisable(true);
        reqList.getSelectionModel().clearSelection();
    }

    @FXML
    void deletePlan(ActionEvent event) {

    }

    @FXML
    void savePlan(ActionEvent event) {

    }

    @FXML
    void loadPlan(ActionEvent event) {

    }

    @FXML
    void rowSelect(MouseEvent event) {
        OpersModel opm = opersTab.getSelectionModel().getSelectedItem();
        String sqlSelectQuery = "SELCT * FROM requirments WHERE Req_ID = " + opm.getReq_ID();
        ObservableList<ReqsModel> reqsList = null;
        reqsList = selectData(reqsList, sqlSelectQuery, "3");
        reqList.getSelectionModel().select(reqsList.get(0));
        addReqBtn.setDisable(true);
        updateReqBtn.setDisable(false);
        deleteReqBtn.setDisable(false);
    }

    @FXML
    void initialize() {
        operIDCol.setCellValueFactory(new PropertyValueFactory<OpersModel, Integer>("oper_ID"));
        operNameCol.setCellValueFactory(new PropertyValueFactory<OpersModel, String>("oper_Name"));
        reqNameCol.setCellValueFactory(new PropertyValueFactory<OpersModel, String>("req_Name"));
        /*operDurationCol.setCellValueFactory(new PropertyValueFactory<OpersModel, Double>("oper_Duration"));
        devNameCol.setCellValueFactory(new PropertyValueFactory<OpersModel, String>("device_Name"));
        devOrderCol.setCellValueFactory(new PropertyValueFactory<OpersModel, Integer>("device_Order"));*/
        dbConn = new DatabaseConnection();
        operationsCategory = new TreeMap<>();
        deviceSet = new HashSet<>();
        reqSet = new HashSet<>();
        updateReqBtn.setDisable(true);
        deleteReqBtn.setDisable(true);
        fillReqList();
        fillPlansList();
    }

    private void fillReqList(){
        String sqlSelectQuery = "SELECT * FROM requirments WHERE requirments.Req_ID IN (SELECT operations_view.Req_ID FROM operations_view)";
        ObservableList<ReqsModel> reqsObsList = null;
        reqsObsList = selectData(reqsObsList, sqlSelectQuery, "3");
        reqList.setItems(null);
        reqList.setItems(reqsObsList);
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
        reqList.setDisable(false);
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
                        dataList.add(new OpersModel(rs.getInt(1), rs.getString(2), rs.getInt(3), rs.getString(4), rs.getDouble(5), rs.getInt(6), rs.getString(7), rs.getInt(8)));
                    }
                    break;
                }
                case "3":{
                    while (rs.next()) {
                        dataList.add(new ReqsModel(rs.getInt(1), rs.getString(2), rs.getString(3)));
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
