namespace Cpmc
{
    using System;
    using System.Web;
    using System.Reflection;
    using System.Web.Http;

    using ICSSoft.STORMNET.Business;
    using ICSSoft.STORMNET;
    using ICSSoft.Services;
    using IIS.Caseberry.Logging.Objects;

    using Microsoft.Practices.Unity;

    using NewPlatform.Flexberry;
    using NewPlatform.Flexberry.ORM.ODataService;
    using NewPlatform.Flexberry.ORM.ODataService.Extensions;
    using NewPlatform.Flexberry.ORM.ODataService.Functions;
    using NewPlatform.Flexberry.ORM.ODataService.Model;
    using NewPlatform.Flexberry.Security;
    using NewPlatform.Flexberry.Services;

    
    using System.Web.Http.Cors;
    using System.Web.Security;

    using ICSSoft.STORMNET.Security;

    using Newtonsoft.Json;

    using ICSSoft.STORMNET.Business.Audit.Objects;


    /// <summary>
    /// Configure OData Service.
    /// </summary>
    internal static partial class ODataConfig
    {
        public static DataObjectEdmModel EdmModel { get; private set; }

        /// <summary>
        /// Configure OData by DataObjects assembly.
        /// </summary>
        /// <param name="config">Http configuration object.</param>
        /// <param name="container">Unity container.</param>
        public static void Configure(HttpConfiguration config, IUnityContainer container)
        {

            container.RegisterInstance(DataServiceProvider.DataService);
            if (config == null)
            {
                throw new ArgumentNullException(nameof(config));
            }

            if (container == null)
            {
                throw new ArgumentNullException(nameof(container));
            }

            // Включаем кросс-доменные запросы.

            var cors = new EnableCorsAttribute("http://localhost:4200,http://r912987s.beget.tech", "*", "*") { SupportsCredentials = true };
            config.EnableCors(cors);

            // Use Unity as WebAPI dependency resolver
            config.DependencyResolver = new UnityDependencyResolver(container);

            // Create EDM model builder
            var assemblies = new[]
            {
                Assembly.Load("Cpmc.Objects"),
                typeof(ApplicationLog).Assembly,
                typeof(UserSetting).Assembly,
                typeof(FlexberryUserSetting).Assembly,
                typeof(Lock).Assembly,
                typeof(Agent).Assembly,
                typeof(AuditEntity).Assembly,
            };
            DefaultDataObjectEdmModelBuilder builder = new DefaultDataObjectEdmModelBuilder(assemblies);

            // Map OData Service
            var token = config.MapODataServiceDataObjectRoute(builder);

            // User functions
            token.Functions.Register(new Func<string, string, string>(Login));
            token.Functions.Register(new Func<bool>(Logout));
            token.Functions.Register(new Func<string>(GetAuthenticatedUser));
            token.Functions.Register(new Func<string, bool>(CheckOperation));

            // Event handlers
            token.Events.CallbackAfterCreate = CallbackAfterCreate;

            EdmModel = token.Model;
        }

        private static void CallbackAfterCreate(DataObject dataObject)
        {
            // TODO: implement handler
        }
    }
}