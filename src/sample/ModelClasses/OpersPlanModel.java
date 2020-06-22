package sample.ModelClasses;

import javafx.beans.property.*;

public class OpersPlanModel {
    private final IntegerProperty Op_Plan_ID;
    private final StringProperty Op_Start;
    private final StringProperty Op_End;
    private final IntegerProperty Op_ID;
    private final IntegerProperty Plan_ID;
    private final StringProperty Req_Name;
    private final StringProperty Device_Name;

    public OpersPlanModel(int op_Plan_ID, String op_Start, String op_End, int op_ID, int plan_ID, String req_Name, String device_Name) {
        Op_Plan_ID = new SimpleIntegerProperty(op_Plan_ID);
        Op_Start = new SimpleStringProperty(op_Start);
        Op_End = new SimpleStringProperty(op_End);
        Op_ID = new SimpleIntegerProperty(op_ID);
        Plan_ID = new SimpleIntegerProperty(plan_ID);
        Req_Name = new SimpleStringProperty(req_Name);
        Device_Name = new SimpleStringProperty(device_Name);
    }

    public int getOp_Plan_ID() {
        return Op_Plan_ID.get();
    }

    public IntegerProperty op_Plan_IDProperty() {
        return Op_Plan_ID;
    }

    public void setOp_Plan_ID(int op_Plan_ID) {
        this.Op_Plan_ID.set(op_Plan_ID);
    }

    public String getOp_Start() {
        return Op_Start.get();
    }

    public StringProperty op_StartProperty() {
        return Op_Start;
    }

    public void setOp_Start(String op_Start) {
        this.Op_Start.set(op_Start);
    }

    public String getOp_End() {
        return Op_End.get();
    }

    public StringProperty op_EndProperty() {
        return Op_End;
    }

    public void setOp_End(String op_End) {
        this.Op_End.set(op_End);
    }

    public int getOp_ID() {
        return Op_ID.get();
    }

    public IntegerProperty op_IDProperty() {
        return Op_ID;
    }

    public void setOp_ID(int op_ID) {
        this.Op_ID.set(op_ID);
    }

    public int getPlan_ID() {
        return Plan_ID.get();
    }

    public IntegerProperty plan_IDProperty() {
        return Plan_ID;
    }

    public void setPlan_ID(int plan_ID) {
        this.Plan_ID.set(plan_ID);
    }

    public String getReq_Name() {
        return Req_Name.get();
    }

    public StringProperty req_NameProperty() {
        return Req_Name;
    }

    public void setReq_Name(String req_Name) {
        this.Req_Name.set(req_Name);
    }

    public String getDevice_Name() {
        return Device_Name.get();
    }

    public StringProperty device_NameProperty() {
        return Device_Name;
    }

    public void setDevice_Name(String device_Name) {
        this.Device_Name.set(device_Name);
    }
}
