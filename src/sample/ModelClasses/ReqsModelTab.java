package sample.ModelClasses;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

public class ReqsModelTab {
    private final IntegerProperty req_ID;
    private final StringProperty req_Code;
    private final StringProperty req_Name;

    public ReqsModelTab (int id, String code, String name)
    {
        this.req_ID = new SimpleIntegerProperty(id);
        this.req_Code = new SimpleStringProperty(code);
        this.req_Name = new SimpleStringProperty(name);
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

    public String getReq_Code() {
        return req_Code.get();
    }

    public StringProperty req_CodeProperty() {
        return req_Code;
    }

    public void setReq_Code(String req_Code) {
        this.req_Code.set(req_Code);
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
}
