﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан программой.
//     Исполняемая версия:4.0.30319.42000
//
//     Изменения в этом файле могут привести к неправильной работе и будут потеряны в случае
//     повторной генерации кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Cpmc
{
    using System;
    using System.Xml;
    using ICSSoft.STORMNET.Business;
    using ICSSoft.STORMNET;
    using ICSSoft.STORMNET.Business.Audit;
    using ICSSoft.STORMNET.Business.Audit.Objects;
    
    
    // *** Start programmer edit section *** (Using statements)

    // *** End programmer edit section *** (Using statements)


    /// <summary>
    /// User.
    /// </summary>
    // *** Start programmer edit section *** (User CustomAttributes)

    // *** End programmer edit section *** (User CustomAttributes)
    //[BusinessServer("AisFkr.UserBS, AisFkr.BusinessServers", ICSSoft.STORMNET.Business.DataServiceObjectEvents.OnAllEvents)]
    [ClassStorage("STORMAG")]
    [AutoAltered()]
    [Caption("Пользователь")]
    [AccessType(ICSSoft.STORMNET.AccessType.@this)]
    [View("AuditView", new string[] {
            "Name",
            "Login",
            "Pwd",
            "IsUser",
            "IsGroup",
            "IsRole",
            "ConnString",
            "Enabled",
            "Email",
            "LastName",
            "FirstName",
            "MiddleName",
            "LastConnect"})]
    [View("UserE", new string[] {
            "Login as \'Логин\'",
            "Pwd as \'Пароль\'",
            "LastName as \'Фамилия\'",
            "FirstName as \'Имя\'",
            "MiddleName as \'Отчество\'",
            "Email as \'E-mail\'",
            "LastConnect as \'Последний вход в систему\'",
            "Enabled as \'Активен\'",})]
    [View("UserL", new string[] {
            "Name as \'Имя\'",
            "Login as \'Логин\'",
            "Email as \'E-Mail\'",
            "Enabled as \'Актуален\'",
            "CreateTime as \'Дата создания\'",
            "Creator as \'Создатель\'",
            "EditTime as \'Дата изменения\'",
            "Editor as \'Редактор\'"})]
    public class User : ICSSoft.STORMNET.Security.Agent
    {
        
        private string fLastName;
        
        private string fFirstName;
        
        private string fMiddleName;
        
        private System.DateTime? fLastConnect;
        
        // *** Start programmer edit section *** (User CustomMembers)

        // *** End programmer edit section *** (User CustomMembers)

        
        /// <summary>
        /// LastName.
        /// </summary>
        // *** Start programmer edit section *** (User.LastName CustomAttributes)

        // *** End programmer edit section *** (User.LastName CustomAttributes)
        public virtual string LastName
        {
            get
            {
                // *** Start programmer edit section *** (User.LastName Get start)

                // *** End programmer edit section *** (User.LastName Get start)
                string result = this.fLastName;
                // *** Start programmer edit section *** (User.LastName Get end)

                // *** End programmer edit section *** (User.LastName Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (User.LastName Set start)

                // *** End programmer edit section *** (User.LastName Set start)
                this.fLastName = value;
                // *** Start programmer edit section *** (User.LastName Set end)

                // *** End programmer edit section *** (User.LastName Set end)
            }
        }
        
        /// <summary>
        /// FirstName.
        /// </summary>
        // *** Start programmer edit section *** (User.FirstName CustomAttributes)

        // *** End programmer edit section *** (User.FirstName CustomAttributes)
        public virtual string FirstName
        {
            get
            {
                // *** Start programmer edit section *** (User.FirstName Get start)

                // *** End programmer edit section *** (User.FirstName Get start)
                string result = this.fFirstName;
                // *** Start programmer edit section *** (User.FirstName Get end)

                // *** End programmer edit section *** (User.FirstName Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (User.FirstName Set start)

                // *** End programmer edit section *** (User.FirstName Set start)
                this.fFirstName = value;
                // *** Start programmer edit section *** (User.FirstName Set end)

                // *** End programmer edit section *** (User.FirstName Set end)
            }
        }
        
        /// <summary>
        /// MiddleName.
        /// </summary>
        // *** Start programmer edit section *** (User.MiddleName CustomAttributes)

        // *** End programmer edit section *** (User.MiddleName CustomAttributes)
        public virtual string MiddleName
        {
            get
            {
                // *** Start programmer edit section *** (User.MiddleName Get start)

                // *** End programmer edit section *** (User.MiddleName Get start)
                string result = this.fMiddleName;
                // *** Start programmer edit section *** (User.MiddleName Get end)

                // *** End programmer edit section *** (User.MiddleName Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (User.MiddleName Set start)

                // *** End programmer edit section *** (User.MiddleName Set start)
                this.fMiddleName = value;
                // *** Start programmer edit section *** (User.MiddleName Set end)

                // *** End programmer edit section *** (User.MiddleName Set end)
            }
        }
        
        /// <summary>
        /// LastConnect.
        /// </summary>
        // *** Start programmer edit section *** (User.LastConnect CustomAttributes)

        // *** End programmer edit section *** (User.LastConnect CustomAttributes)
        public virtual System.DateTime? LastConnect
        {
            get
            {
                // *** Start programmer edit section *** (User.LastConnect Get start)

                // *** End programmer edit section *** (User.LastConnect Get start)
                System.DateTime? result = this.fLastConnect;
                // *** Start programmer edit section *** (User.LastConnect Get end)

                // *** End programmer edit section *** (User.LastConnect Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (User.LastConnect Set start)

                // *** End programmer edit section *** (User.LastConnect Set start)
                this.fLastConnect = value;
                // *** Start programmer edit section *** (User.LastConnect Set end)

                // *** End programmer edit section *** (User.LastConnect Set end)
            }
        }
        
        /// <summary>
        /// Class views container.
        /// </summary>
        public class Views
        {
            
            /// <summary>
            /// "AuditView" view.
            /// </summary>
            public static ICSSoft.STORMNET.View AuditView
            {
                get
                {
                    return ICSSoft.STORMNET.Information.GetView("AuditView", typeof(Cpmc.User));
                }
            }
            
            /// <summary>
            /// "UserE" view.
            /// </summary>
            public static ICSSoft.STORMNET.View UserE
            {
                get
                {
                    return ICSSoft.STORMNET.Information.GetView("UserE", typeof(Cpmc.User));
                }
            }
            
            /// <summary>
            /// "UserL" view.
            /// </summary>
            public static ICSSoft.STORMNET.View UserL
            {
                get
                {
                    return ICSSoft.STORMNET.Information.GetView("UserL", typeof(Cpmc.User));
                }
            }
        }
        
        /// <summary>
        /// Audit class settings.
        /// </summary>
        public class AuditSettings
        {
            
            /// <summary>
            /// Включён ли аудит для класса.
            /// </summary>
            public static bool AuditEnabled = true;
            
            /// <summary>
            /// Использовать имя представления для аудита по умолчанию.
            /// </summary>
            public static bool UseDefaultView = false;
            
            /// <summary>
            /// Включён ли аудит операции чтения.
            /// </summary>
            public static bool SelectAudit = false;
            
            /// <summary>
            /// Имя представления для аудирования операции чтения.
            /// </summary>
            public static string SelectAuditViewName = "AuditView";
            
            /// <summary>
            /// Включён ли аудит операции создания.
            /// </summary>
            public static bool InsertAudit = true;
            
            /// <summary>
            /// Имя представления для аудирования операции создания.
            /// </summary>
            public static string InsertAuditViewName = "AuditView";
            
            /// <summary>
            /// Включён ли аудит операции изменения.
            /// </summary>
            public static bool UpdateAudit = true;
            
            /// <summary>
            /// Имя представления для аудирования операции изменения.
            /// </summary>
            public static string UpdateAuditViewName = "AuditView";
            
            /// <summary>
            /// Включён ли аудит операции удаления.
            /// </summary>
            public static bool DeleteAudit = true;
            
            /// <summary>
            /// Имя представления для аудирования операции удаления.
            /// </summary>
            public static string DeleteAuditViewName = "AuditView";
            
            /// <summary>
            /// Путь к форме просмотра результатов аудита.
            /// </summary>
            public static string FormUrl = "";
            
            /// <summary>
            /// Режим записи данных аудита (синхронный или асинхронный).
            /// </summary>
            public static ICSSoft.STORMNET.Business.Audit.Objects.tWriteMode WriteMode = ICSSoft.STORMNET.Business.Audit.Objects.tWriteMode.Synchronous;
            
            /// <summary>
            /// Максимальная длина сохраняемого значения поля (если 0, то строка обрезаться не будет).
            /// </summary>
            public static int PrunningLength = 0;
            
            /// <summary>
            /// Показывать ли пользователям в изменениях первичные ключи.
            /// </summary>
            public static bool ShowPrimaryKey = false;
            
            /// <summary>
            /// Сохранять ли старое значение.
            /// </summary>
            public static bool KeepOldValue = true;
            
            /// <summary>
            /// Сжимать ли сохраняемые значения.
            /// </summary>
            public static bool Compress = false;
            
            /// <summary>
            /// Сохранять ли все значения атрибутов, а не только изменяемые.
            /// </summary>
            public static bool KeepAllValues = false;
        }
    }
}