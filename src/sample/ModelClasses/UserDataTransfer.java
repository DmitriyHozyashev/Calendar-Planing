package sample.ModelClasses;

public class UserDataTransfer {
    private static UserDataTransfer userDataInstance;

    private UserModel userModel;

    private UserDataTransfer() {
    }

    public UserModel getUserModel() {
        return userModel;
    }

    public void setUserModel(UserModel userModel) {
        this.userModel = userModel;
    }

    public static UserDataTransfer getInstance(){
        if(userDataInstance == null)
            userDataInstance = new UserDataTransfer();
        return userDataInstance;
    }
}
