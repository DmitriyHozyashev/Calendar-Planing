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
import sample.Classes.DevicesModelTab;
import sample.DatabaseConnection;

public class DevicesPageController {

    private DatabaseConnection dbConn;

    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;

    @FXML
    private AnchorPane deviceAnchorPane;

    @FXML
    private TableView<DevicesModelTab> devicesTab;

    @FXML
    private TableColumn<DevicesModelTab, Integer> deviceIDCol;

    @FXML
    private TableColumn<DevicesModelTab, String> deviceCodeCol;

    @FXML
    private TableColumn<DevicesModelTab, String> deviceNameCol;

    @FXML
    private Button addDevBtn;

    @FXML
    private Button deleteDevBtn;

    @FXML
    private Button updateDevBtn;

    @FXML
    private TextField codeDevField;

    @FXML
    private TextField nameDevField;

    @FXML
    private Label errLabel;

    @FXML
    void clearFields(MouseEvent event) {
        codeDevField.clear();
        nameDevField.clear();
        addDevBtn.setDisable(false);
        updateDevBtn.setDisable(true);
        deleteDevBtn.setDisable(true);
    }

    @FXML
    void rowSelect(MouseEvent event) {
        addDevBtn.setDisable(true);
        DevicesModelTab dmt = devicesTab.getSelectionModel().getSelectedItem();
        if (dmt == null)
            return;
        codeDevField.setText(dmt.getDevice_Code());
        nameDevField.setText(dmt.getDevice_Name());
        updateDevBtn.setDisable(false);
        deleteDevBtn.setDisable(false);
    }

    @FXML
    void addDevice(ActionEvent event) {
        String codeDev = codeDevField.getText();
        String nameDev = nameDevField.getText();
        if(codeDev.equals("") || nameDev.equals("")) {
            errLabel.setText("Заполните пустые поля");
            return;
        }
        String sqlInsertQuery = "INSERT INTO devices (Device_Code, Device_Name) VALUES (?, ?)";
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = dbConn.getDbConnection();
            ps = conn.prepareStatement(sqlInsertQuery);
            ps.setString(1, codeDev);
            ps.setString(2, nameDev);
            ps.executeUpdate();
        }catch (SQLException er){
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
        errLabel.setText("");
        codeDevField.clear();
        nameDevField.clear();
        loadDeviceData();
    }

    @FXML
    void deleteDevice(ActionEvent event) {
        DevicesModelTab dmt = devicesTab.getSelectionModel().getSelectedItem();
        if (dmt.equals(null)) {
            errLabel.setText("Выберите данные для удаления");
            return;
        }
        String sqlDeleteQuery = "DELETE  FROM devices WHERE Device_ID = ?";
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = dbConn.getDbConnection();
            ps = conn.prepareStatement(sqlDeleteQuery);
            ps.setInt(1, dmt.getDevice_ID());
            ps.executeUpdate();
        }catch (SQLException er){
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
        errLabel.setText("");
        codeDevField.clear();
        nameDevField.clear();
        addDevBtn.setDisable(false);
        deleteDevBtn.setDisable(true);
        updateDevBtn.setDisable(true);
        loadDeviceData();
    }

    @FXML
    void updateDevice(ActionEvent event) {
        DevicesModelTab dmt = devicesTab.getSelectionModel().getSelectedItem();
        String codeDev = codeDevField.getText();
        String nameDev = nameDevField.getText();
        if(codeDev.equals("") || nameDev.equals("") || dmt.equals(null)) {
            errLabel.setText("Заполните пустые поля");
            return;
        }
        String sqlUpdateQuery = "UPDATE devices SET Device_Code = ?, Device_Name = ? WHERE Device_ID = ?";
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = dbConn.getDbConnection();
            ps = conn.prepareStatement(sqlUpdateQuery);
            ps.setString(1, codeDev);
            ps.setString(2, nameDev);
            ps.setInt(3, dmt.getDevice_ID());
            ps.executeUpdate();
        }catch (SQLException er){
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
        errLabel.setText("");
        codeDevField.clear();
        nameDevField.clear();
        addDevBtn.setDisable(false);
        deleteDevBtn.setDisable(true);
        updateDevBtn.setDisable(true);
        loadDeviceData();
    }

    @FXML
    void initialize() {
        dbConn = new DatabaseConnection();
        errLabel.setText("");
        deleteDevBtn.setDisable(true);
        updateDevBtn.setDisable(true);
        loadDeviceData();
    }

    private void loadDeviceData()
    {
        String sqlSelectQuery = "SELECT * FROM devices";
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        ObservableList<DevicesModelTab> deviceData = null;
        try {
            conn = dbConn.getDbConnection();
            deviceData = FXCollections.observableArrayList();
            ps = conn.prepareStatement(sqlSelectQuery);
            rs = ps.executeQuery();
            while (rs.next()){
                deviceData.add(new DevicesModelTab(rs.getInt(1), rs.getString(2), rs.getString(3)));
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
                errLabel.setText("Ошибка загрузки данных");
                e.printStackTrace();
            }
        }
        errLabel.setText("");
        deviceIDCol.setCellValueFactory(new PropertyValueFactory<DevicesModelTab, Integer>("device_ID"));
        deviceCodeCol.setCellValueFactory(new PropertyValueFactory<DevicesModelTab, String>("device_Code"));
        deviceNameCol.setCellValueFactory(new PropertyValueFactory<DevicesModelTab, String>("device_Name"));
        devicesTab.setItems(null);
        devicesTab.setItems(deviceData);
    }
}
