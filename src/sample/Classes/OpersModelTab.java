package sample.Classes;

import javafx.beans.property.*;

public class OpersModelTab {
    private final IntegerProperty oper_ID;
    private final StringProperty oper_Name;
    private final IntegerProperty req_ID;
    private final StringProperty req_Name;
    private final DoubleProperty oper_Duration;
    private final IntegerProperty device_ID;
    private final StringProperty device_Name;
    private final IntegerProperty device_Order;

    public OpersModelTab(int op_id, String op_name, int req_id, String req_name, double op_duration, int dev_id, String dev_name, int dev_order)
    {
        this.oper_ID = new SimpleIntegerProperty(op_id);
        this.oper_Name = new SimpleStringProperty(op_name);
        this.req_ID = new SimpleIntegerProperty(req_id);
        this.req_Name = new SimpleStringProperty(req_name);
        this.oper_Duration = new SimpleDoubleProperty(op_duration);
        this.device_ID = new SimpleIntegerProperty(dev_id);
        this.device_Name = new SimpleStringProperty(dev_name);
        this.device_Order = new SimpleIntegerProperty(dev_order);
    }

    public int getOper_ID() {
        return oper_ID.get();
    }

    public IntegerProperty oper_IDProperty() {
        return oper_ID;
    }

    public void setOper_ID(int oper_ID) {
        this.oper_ID.set(oper_ID);
    }

    public String getReq_Name() {
        return req_Name.get();
    }

    public StringProperty req_NameProperty() {
        return req_Name;
    }

    public void setReq_Name(String req_Name) {
        this.req_Name.set(req_Name);
    }

    public String getDevice_Name() {
        return device_Name.get();
    }

    public StringProperty device_NameProperty() {
        return device_Name;
    }

    public void setDevice_Name(String device_Name) {
        this.device_Name.set(device_Name);
    }

    public String getOper_Name() {
        return oper_Name.get();
    }

    public StringProperty oper_NameProperty() {
        return oper_Name;
    }

    public void setOper_Name(String oper_Name) {
        this.oper_Name.set(oper_Name);
    }

    public int getReq_ID() {
        return req_ID.get();
    }

    public IntegerProperty req_IDProperty() {
        return req_ID;
    }

    public void setReq_ID(int req_ID) {
        this.req_ID.set(req_ID);
    }

    public double getOper_Duration() {
        return oper_Duration.get();
    }

    public DoubleProperty oper_DurationProperty() {
        return oper_Duration;
    }

    public void setOper_Duration(double oper_Time) {
        this.oper_Duration.set(oper_Time);
    }

    public int getDevice_ID() {
        return device_ID.get();
    }

    public IntegerProperty device_IDProperty() {
        return device_ID;
    }

    public void setDevice_ID(int device_ID) {
        this.device_ID.set(device_ID);
    }

    public int getDevice_Order() {
        return device_Order.get();
    }

    public IntegerProperty device_OrderProperty() {
        return device_Order;
    }

    public void setDevice_Order(int device_Order) {
        this.device_Order.set(device_Order);
    }
}
