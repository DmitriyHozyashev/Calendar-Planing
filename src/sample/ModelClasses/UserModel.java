package sample.ModelClasses;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

public class UserModel {
    private final IntegerProperty user_ID;
    private final StringProperty user_Login;
    private final StringProperty user_Password;

    public UserModel(int user_ID, String user_Login, String user_Password) {
        this.user_ID = new SimpleIntegerProperty(user_ID);
        this.user_Login = new SimpleStringProperty(user_Login);
        this.user_Password = new SimpleStringProperty(user_Password);
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

    public String getUser_Password() {
        return user_Password.get();
    }

    public StringProperty user_PasswordProperty() {
        return user_Password;
    }

    public void setUser_Password(String user_Password) {
        this.user_Password.set(user_Password);
    }
}
