package sample.ModelClasses;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

public class UserModel {
    private final IntegerProperty user_ID;
    private final StringProperty user_Login;

    public UserModel(int user_ID, String user_Login) {
        this.user_ID = new SimpleIntegerProperty(user_ID);
        this.user_Login = new SimpleStringProperty(user_Login);
    }

    public int getUser_ID() {
        return user_ID.get();
    }

    public IntegerProperty user_IDProperty() {
        return user_ID;
    }

    public void setUser_ID(int user_ID) {
        this.user_ID.set(user_ID);
    }

    public String getUser_Login() {
        return user_Login.get();
    }

    public StringProperty user_LoginProperty() {
        return user_Login;
    }

    public void setUser_Login(String user_Login) {
        this.user_Login.set(user_Login);
    }
}
