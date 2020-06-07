package sample.Controllers;

import java.net.URL;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;

public class PlansPageController {

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
    private ComboBox<?> plansList;

    @FXML
    private Button deletePlanBtn;

    @FXML
    private TextField planNameField;

    @FXML
    private TextField planTimeStartField;

    @FXML
    private ComboBox<?> algorithmsList;

    @FXML
    private Button savePlanBtn1;

    @FXML
    private Button addReqBtn;

    @FXML
    private Button deleteReqBtn;

    @FXML
    private Button updateReqBtn;

    @FXML
    private ComboBox<?> reqList;

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
    }
}
