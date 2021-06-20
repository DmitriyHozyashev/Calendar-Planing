namespace Cpmc
{
    using ICSSoft.STORMNET.Security;

    using NewPlatform.Flexberry.Security;

    using Newtonsoft.Json;

    using System.Web;
    using System.Web.Security;

    using ICSSoft.Services;

    using ICSSoft.Services;
    using ICSSoft.STORMNET.Business;
    using ICSSoft.STORMNET.Security;
    using Microsoft.Practices.Unity;
    using NewPlatform.Flexberry.Security;
    /// <summary>
    /// Конфигурация OData-сервиса, содержащая OData-функции для работы с текущим пользователем.
    /// </summary>
    internal static partial class ODataConfig
    {
        class UserInfo
        {
            public string Login { get; set; }

            public string Name { get; set; }

            public string Email { get; set; }
        }

        /// <summary>
        /// Аутентификация пользователя.
        /// </summary>
        /// <param name="login">Логин пользователя.</param>
        /// <param name="password">Пароль пользователя.</param>
        /// <returns>Информация о пользователе в случае успеха и null в случае ошибки.</returns>
        private static string Login(string login, string password)
        {
            IUserManager userManager = UnityFactory.GetContainer().Resolve<IUserManager>();

            if (userManager.IsUserExist(login, password))
            {
                FormsAuthentication.SetAuthCookie(login, true);
                return login;
            }

            return "";
        }

        /// <summary>
        /// Проверка полномочий на выполнение операций.
        /// </summary>
        /// <param name="operation">Название операции.</param>
        /// <returns>Возвращает true, если у текущего пользователя есть доступ.</returns>
        private static bool CheckOperation(string operation)
        {
            //ISecurityManager securityManager = UnityGlobal.SecurityManager;

            //var result = securityManager.AccessCheck(operation);
            
            return false;
        }

        /// <summary>
        /// Выход пользователя из системы.
        /// </summary>
        /// <returns>Успешность выполнения выхода.</returns>
        private static bool Logout()
        {
            FormsAuthentication.SignOut();
            return true;
        }

		/// <summary>
        /// Получение текущего имени пользователя.
        /// </summary>
        /// <returns>Информация о пользователе или null.</returns>
        private static string GetAuthenticatedUser()
        {
            HttpCookie authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            if (authCookie == null)
                return string.Empty;

            FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
            if (ticket == null)
                return string.Empty;

            return ticket.Name;
        }

        /// <summary>
        /// Узнать авторизован ли текущий пользователь на сервере.
        /// </summary>
        /// <param name="username">Имя пользователя.</param>
        /// <returns>Возвращает true, если пользователь авторизован.</returns>
        private static bool IsUserAuthnticated(string username)
        {
            return HttpContext.Current.User.Identity.IsAuthenticated;
        }
    }
}