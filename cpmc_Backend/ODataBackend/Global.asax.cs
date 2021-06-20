namespace Cpmc
{
    using System;
    using System.Web;
    using System.Web.Http;

    using ICSSoft.STORMNET.Business;

    using Microsoft.Practices.Unity;
    using Microsoft.Practices.Unity.Configuration;
    using ICSSoft.STORMNET.Business.Audit;
    using ICSSoft.STORMNET.Business;

    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            IUnityContainer container = new UnityContainer();
            container.LoadConfiguration();
            container.RegisterInstance(DataServiceProvider.DataService);
            GlobalConfiguration.Configure(configuration => ODataConfig.Configure(configuration, container));
            GlobalConfiguration.Configuration.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
            AuditSetter.InitAuditService(DataServiceProvider.DataService);
        }
    }
}
