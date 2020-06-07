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
import org.jfree.data.gantt.GanttCategoryDataset;
import sample.ModelClasses.DevicesModel;
import sample.ModelClasses.OpersModel;
import sample.ModelClasses.ReqsModel;
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
    private TableView<OpersModel> opersTab;

    @FXML
    private TableColumn<OpersModel, Integer> operIDCol;

    @FXML
    private TableColumn<OpersModel, String> operNameCol;

    @FXML
    private TableColumn<OpersModel, Double> operDurationCol;

    @FXML
    private TableColumn<OpersModel, String> reqNameCol;

    @FXML
    private TableColumn<OpersModel, String> devNameCol;

    @FXML
    private TableColumn<OpersModel, Integer> devOrderCol;

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
    private ComboBox<ReqsModel> reqOperList;

    @FXML
    private ComboBox<DevicesModel> deviceOperList;

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
        OpersModel omt = opersTab.getSelectionModel().getSelectedItem();
        if (omt == null)
            return;
        DevicesModel dmt = new DevicesModel(omt.getDevice_ID(),"",omt.getDevice_Name());
        ReqsModel rmt = new ReqsModel(omt.getReq_ID(), "", omt.getReq_Name());
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
        DevicesModel dmt = deviceOperList.getSelectionModel().getSelectedItem();
        ReqsModel rmt = reqOperList.getSelectionModel().getSelectedItem();
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
        OpersModel omt = opersTab.getSelectionModel().getSelectedItem();
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
        OpersModel omt = opersTab.getSelectionModel().getSelectedItem();
        DevicesModel dmt = deviceOperList.getSelectionModel().getSelectedItem();
        ReqsModel rmt = reqOperList.getSelectionModel().getSelectedItem();
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
        ObservableList<ReqsModel> reqData = null;
        reqData = selectData("requirments", reqData);
        reqOperList.setItems(null);
        reqOperList.setItems(reqData);
        reqOperList.setConverter(new StringConverter<ReqsModel>() {
            @Override
            public String toString(ReqsModel reqsModel) {
                if (reqsModel == null){
                    return null;
                } else {
                    return reqsModel.getReq_Name();
                }
            }

            @Override
            public ReqsModel fromString(String s) {
                return null;
            }
        });
    }

    private void fillDeviceList(){
        ObservableList <DevicesModel> devData = null;
        devData = selectData("devices", devData);
        deviceOperList.setItems(null);
        deviceOperList.setItems(devData);
        deviceOperList.setConverter(new StringConverter<DevicesModel>() {
            @Override
            public String toString(DevicesModel devicesModel) {
                if (devicesModel == null){
                    return null;
                } else {
                    return devicesModel.getDevice_Name();
                }
            }

            @Override
            public DevicesModel fromString(String s) {
                return null;
            }
        });
    }

    private void loadOpersData(){
        ObservableList<OpersModel> opersData = null;
        opersData = selectData("operations_view", opersData);
        operIDCol.setCellValueFactory(new PropertyValueFactory<OpersModel, Integer>("oper_ID"));
        operNameCol.setCellValueFactory(new PropertyValueFactory<OpersModel, String>("oper_Name"));
        reqNameCol.setCellValueFactory(new PropertyValueFactory<OpersModel, String>("req_Name"));
        operDurationCol.setCellValueFactory(new PropertyValueFactory<OpersModel, Double>("oper_Duration"));
        devNameCol.setCellValueFactory(new PropertyValueFactory<OpersModel, String>("device_Name"));
        devOrderCol.setCellValueFactory(new PropertyValueFactory<OpersModel, Integer>("device_Order"));
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
                        dataList.add(new ReqsModel(rs.getInt(1), rs.getString(2), rs.getString(3)));
                    }
                    break;
                }
                case "devices":{
                    while (rs.next()) {
                        dataList.add(new DevicesModel(rs.getInt(1), rs.getString(2), rs.getString(3)));
                    }
                    break;
                }
                case "operations_view":{
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
