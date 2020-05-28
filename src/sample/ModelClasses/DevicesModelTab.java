package sample.ModelClasses;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

public class DevicesModelTab {
    private final IntegerProperty device_ID;
    private final StringProperty device_Code;
    private final StringProperty device_Name;

    public DevicesModelTab(int id, String code, String name) {
        this.device_ID = new SimpleIntegerProperty(id);
        this.device_Code = new  SimpleStringProperty(code);
        this.device_Name = new SimpleStringProperty(name);
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

    public String getDevice_Code() {
        return device_Code.get();
    }

    public StringProperty device_CodeProperty() {
        return device_Code;
    }

    public void setDevice_Code(String device_Code) {
        this.device_Code.set(device_Code);
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
}
