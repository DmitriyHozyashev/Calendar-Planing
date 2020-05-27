package sample.Controllers;

import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ResourceBundle;

import javafx.beans.Observable;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.util.StringConverter;
import sample.Classes.DevicesModelTab;
import sample.Classes.OpersModelTab;
import sample.Classes.ReqsModelTab;
import sample.DatabaseConnection;

public class OpersPageController {

    private DatabaseConnection dbConn;

    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;

    @FXML
    private AnchorPane opersAnchorPane;

    @FXML
    private TableView<OpersModelTab> opersTab;

    @FXML
    private TableColumn<OpersModelTab, Integer> operIDCol;

    @FXML
    private TableColumn<OpersModelTab, String> operNameCol;

    @FXML
    private TableColumn<OpersModelTab, Double> operDurationCol;

    @FXML
    private TableColumn<OpersModelTab, String> reqNameCol;

    @FXML
    private TableColumn<OpersModelTab, String> devNameCol;

    @FXML
    private TableColumn<OpersModelTab, Integer> devOrderCol;

    @FXML
    private Button addOperBtn;

    @FXML
    private Button deleteOperBtn;

    @FXML
    private Button updateOperBtn;

    @FXML
    private TextField nameOperField;

    @FXML
    private TextField durationOperField;

    @FXML
    private TextField deviceOrderOperFiled;

    @FXML
    private ComboBox<ReqsModelTab> reqOperList;

    @FXML
    private ComboBox<DevicesModelTab> deviceOperList;

    @FXML
    void clearFields(MouseEvent event) {
        nameOperField.clear();
        durationOperField.clear();
        deviceOrderOperFiled.clear();
        deviceOperList.getSelectionModel().clearSelection();
        reqOperList.getSelectionModel().clearSelection();
        addOperBtn.setDisable(false);
        deleteOperBtn.setDisable(true);
        updateOperBtn.setDisable(true);
    }

    @FXML
    void rowSelect(MouseEvent event) {
        addOperBtn.setDisable(true);
        OpersModelTab omt = opersTab.getSelectionModel().getSelectedItem();
        if (omt == null)
            return;
        nameOperField.setText(omt.getOper_Name());
        durationOperField.setText(String.valueOf(omt.getOper_Duration()));
        deviceOrderOperFiled.setText(String.valueOf(omt.getDevice_Order()));
    }

    @FXML
    void addOperation(ActionEvent event) {
        String operName = nameOperField.getText();
        Double operDuration = Double.valueOf(durationOperField.getText().replace(',', '.'));
        Integer deviceOrder = Integer.valueOf(deviceOrderOperFiled.getText());
        DevicesModelTab dmt = deviceOperList.getSelectionModel().getSelectedItem();
        ReqsModelTab rmt = reqOperList.getSelectionModel().getSelectedItem();
        if (operName.equals(null) || operDuration.equals(null) || deviceOrder.equals(null) || dmt.equals(null))
            return;
    }

    @FXML
    void deleteOperation(ActionEvent event) {

        deleteOperBtn.setDisable(true);
        updateOperBtn.setDisable(true);
    }

    @FXML
    void updateOperation(ActionEvent event) {

        deleteOperBtn.setDisable(true);
        updateOperBtn.setDisable(true);
    }

    @FXML
    void initialize() {
        dbConn = new DatabaseConnection();
        deleteOperBtn.setDisable(true);
        updateOperBtn.setDisable(true);

        fillReqList();
        fillDeviceList();
        loadOpersData();
    }

    private void fillReqList(){
        ObservableList<ReqsModelTab> reqData = null;
        reqData = selectData("requirments", reqData);
        reqOperList.setItems(null);
        reqOperList.setItems(reqData);
        reqOperList.setConverter(new StringConverter<ReqsModelTab>() {
            @Override
            public String toString(ReqsModelTab reqsModelTab) {
                if (reqsModelTab == null){
                    return null;
                } else {
                    return reqsModelTab.getReq_Name();
                }
            }

            @Override
            public ReqsModelTab fromString(String s) {
                return null;
            }
        });
    }

    private void fillDeviceList(){
        ObservableList <DevicesModelTab> devData = null;
        devData = selectData("devices", devData);
        deviceOperList.setItems(null);
        deviceOperList.setItems(devData);
        deviceOperList.setConverter(new StringConverter<DevicesModelTab>() {
            @Override
            public String toString(DevicesModelTab devicesModelTab) {
                if (devicesModelTab == null){
                    return null;
                } else {
                    return devicesModelTab.getDevice_Name();
                }
            }

            @Override
            public DevicesModelTab fromString(String s) {
                return null;
            }
        });
    }

    private void loadOpersData(){
        ObservableList<OpersModelTab> opersData = null;
        opersData = selectData("operations_view", opersData);
        operIDCol.setCellValueFactory(new PropertyValueFactory<OpersModelTab, Integer>("oper_ID"));
        operNameCol.setCellValueFactory(new PropertyValueFactory<OpersModelTab, String>("oper_Name"));
        reqNameCol.setCellValueFactory(new PropertyValueFactory<OpersModelTab, String>("req_Name"));
        operDurationCol.setCellValueFactory(new PropertyValueFactory<OpersModelTab, Double>("oper_Duration"));
        devNameCol.setCellValueFactory(new PropertyValueFactory<OpersModelTab, String>("device_Name"));
        devOrderCol.setCellValueFactory(new PropertyValueFactory<OpersModelTab, Integer>("device_Order"));
        opersTab.setItems(null);
        opersTab.setItems(opersData);
    }

    private ObservableList selectData(String tableName, ObservableList dataList)
    {
        String sqlSelectQuery = "SELECT * FROM "+tableName;
        dataList = null;
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            conn = dbConn.getDbConnection();
            dataList = FXCollections.observableArrayList();
            ps = conn.prepareStatement(sqlSelectQuery);
            rs = ps.executeQuery();
            switch (tableName)
            {
                case "requirments": {
                    while (rs.next()) {
                        dataList.add(new ReqsModelTab(rs.getInt(1), rs.getString(2), rs.getString(3)));
                    }
                    break;
                }
                case "devices":{
                    while (rs.next()) {
                        dataList.add(new DevicesModelTab(rs.getInt(1), rs.getString(2), rs.getString(3)));
                    }
                    break;
                }
                case "operations_view":{
                    while (rs.next()) {
                        dataList.add(new OpersModelTab(rs.getInt(1), rs.getString(2), rs.getInt(3), rs.getString(4), rs.getDouble(5), rs.getInt(6), rs.getString(7), rs.getInt(8)));
                    }
                    break;
                }
                default:{
                    return null;
                }
            }
        }catch (SQLException er){
            er.printStackTrace();
        }
        finally {
            try {
                rs.close();
                ps.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return dataList;
    }
}
