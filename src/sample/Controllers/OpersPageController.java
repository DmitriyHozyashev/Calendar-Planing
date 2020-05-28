package sample.Controllers;

import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ResourceBundle;
import java.util.function.UnaryOperator;
import java.util.regex.Pattern;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.util.StringConverter;
import sample.ModelClasses.DevicesModelTab;
import sample.ModelClasses.OpersModelTab;
import sample.ModelClasses.ReqsModelTab;
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
    private Label errLabel;

    @FXML
    private ComboBox<ReqsModelTab> reqOperList;

    @FXML
    private ComboBox<DevicesModelTab> deviceOperList;

    @FXML
    void clearFieldsEvent(MouseEvent event) {
        int count = event.getClickCount();
        if (count == 2)
            clearFields();
    }

    private void clearFields() {
        errLabel.setText("");
        nameOperField.clear();
        durationOperField.clear();
        deviceOrderOperFiled.clear();
        deviceOperList.getSelectionModel().clearSelection();
        deviceOperList.setValue(null);
        reqOperList.getSelectionModel().clearSelection();
        reqOperList.setValue(null);
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
        DevicesModelTab dmt = new DevicesModelTab(omt.getDevice_ID(),"",omt.getDevice_Name());
        ReqsModelTab rmt = new ReqsModelTab(omt.getReq_ID(), "", omt.getReq_Name());
        deviceOperList.getSelectionModel().select(dmt);
        reqOperList.getSelectionModel().select(rmt);
        nameOperField.setText(omt.getOper_Name());
        durationOperField.setText(String.valueOf(omt.getOper_Duration()));
        deviceOrderOperFiled.setText(String.valueOf(omt.getDevice_Order()));
        updateOperBtn.setDisable(false);
        deleteOperBtn.setDisable(false);
    }

    @FXML
    void addOperation(ActionEvent event) {
        String operName = nameOperField.getText();
        DevicesModelTab dmt = deviceOperList.getSelectionModel().getSelectedItem();
        ReqsModelTab rmt = reqOperList.getSelectionModel().getSelectedItem();
        if (operName.equals(null) || durationOperField.equals(null) || deviceOrderOperFiled.equals(null) || rmt.equals(null) || dmt.equals(null)) {
            errLabel.setText("Заполните все поля");
            return;
        }
        Double operDuration = Double.parseDouble(durationOperField.getText());
        Integer deviceOrder = Integer.parseInt(deviceOrderOperFiled.getText());
        String sqlInsertQuery = "INSERT INTO operations (Op_Name, Req_ID, Op_Duration, Device_ID, Device_Order) VALUES (?, ?, ?, ?, ?)";
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = dbConn.getDbConnection();
            ps = conn.prepareStatement(sqlInsertQuery);
            ps.setString(1, operName);
            ps.setInt(2, rmt.getReq_ID());
            ps.setDouble(3, operDuration);
            ps.setInt(4, dmt.getDevice_ID());
            ps.setInt(5, deviceOrder);
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
        loadOpersData();
    }

    @FXML
    void deleteOperation(ActionEvent event) {
        OpersModelTab omt = opersTab.getSelectionModel().getSelectedItem();
        if(omt.equals(null)) {
            errLabel.setText("Выберите данные для удаления");
            return;
        }
        String sqlDeleteQuery = "DELETE FROM operations WHERE Op_ID = ?";
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = dbConn.getDbConnection();
            ps = conn.prepareStatement(sqlDeleteQuery);
            ps.setInt(1, omt.getOper_ID());
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
        loadOpersData();
    }

    @FXML
    void updateOperation(ActionEvent event) {
        String operName = nameOperField.getText();
        OpersModelTab omt = opersTab.getSelectionModel().getSelectedItem();
        DevicesModelTab dmt = deviceOperList.getSelectionModel().getSelectedItem();
        ReqsModelTab rmt = reqOperList.getSelectionModel().getSelectedItem();
        if (operName.equals(null) || durationOperField.equals(null) || deviceOrderOperFiled.equals(null) || rmt.equals(null) || dmt.equals(null) || omt.equals(null)) {
            errLabel.setText("Заполните все поля");
            return;
        }
        Double operDuration = Double.parseDouble(durationOperField.getText());
        Integer deviceOrder = Integer.parseInt(deviceOrderOperFiled.getText());
        String sqlUpdateQuery = "UPDATE operations SET Op_Name = ?, Req_ID = ?, Op_Duration = ?, Device_ID = ?, Device_Order = ? WHERE Op_ID = ?";
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = dbConn.getDbConnection();
            ps = conn.prepareStatement(sqlUpdateQuery);
            ps.setString(1, operName);
            ps.setInt(2, rmt.getReq_ID());
            ps.setDouble(3, operDuration);
            ps.setInt(4, dmt.getDevice_ID());
            ps.setInt(5, deviceOrder);
            ps.setInt(6, omt.getOper_ID());
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
        loadOpersData();
    }

    @FXML
    void initialize() {
        dbConn = new DatabaseConnection();
        deleteOperBtn.setDisable(true);
        updateOperBtn.setDisable(true);
        Pattern doublePattern = Pattern.compile("\\d*|\\d+\\.\\d*");
        TextFormatter doubleFormatter = new TextFormatter((UnaryOperator<TextFormatter.Change>) change -> doublePattern.matcher(change.getControlNewText()).matches() ? change : null);
        durationOperField.setTextFormatter(doubleFormatter);
        Pattern intPattern = Pattern.compile("\\d*");
        TextFormatter intFormatter = new TextFormatter((UnaryOperator<TextFormatter.Change>) change -> intPattern.matcher(change.getControlNewText()).matches() ? change : null);
        deviceOrderOperFiled.setTextFormatter(intFormatter);
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
