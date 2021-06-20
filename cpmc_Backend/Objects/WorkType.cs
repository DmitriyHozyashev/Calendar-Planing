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
    using ICSSoft.STORMNET;
    using ICSSoft.STORMNET.Business.Audit;
    using ICSSoft.STORMNET.Business.Audit.Objects;
    
    
    // *** Start programmer edit section *** (Using statements)

    // *** End programmer edit section *** (Using statements)


    /// <summary>
    /// Work type.
    /// </summary>
    // *** Start programmer edit section *** (WorkType CustomAttributes)

    // *** End programmer edit section *** (WorkType CustomAttributes)
    [AutoAltered()]
    [Caption("Тип")]
    [AccessType(ICSSoft.STORMNET.AccessType.none)]
    [View("AuditView", new string[] {
            "Name as \'Name\'",
            "Comment as \'Comment\'",
            "CreateTime as \'Create time\'",
            "Creator as \'Creator\'",
            "EditTime as \'Edit time\'",
            "Editor as \'Editor\'"})]
    [View("WorkTypeE", new string[] {
            "Name as \'Наименование\'",
            "Comment as \'Комментарий\'"})]
    [View("WorkTypeL", new string[] {
            "Name as \'Наименование\'",
            "Comment as \'Комментарий\'",
            "CreateTime",
            "Creator",
            "EditTime",
            "Editor"})]
    public class WorkType : ICSSoft.STORMNET.DataObject, IDataObjectWithAuditFields
    {
        
        private string fName;
        
        private string fComment;
        
        private System.Nullable<System.DateTime> fCreateTime;
        
        private string fCreator;
        
        private System.Nullable<System.DateTime> fEditTime;
        
        private string fEditor;
        
        // *** Start programmer edit section *** (WorkType CustomMembers)

        // *** End programmer edit section *** (WorkType CustomMembers)

        
        /// <summary>
        /// Name.
        /// </summary>
        // *** Start programmer edit section *** (WorkType.Name CustomAttributes)

        // *** End programmer edit section *** (WorkType.Name CustomAttributes)
        [StrLen(255)]
        public virtual string Name
        {
            get
            {
                // *** Start programmer edit section *** (WorkType.Name Get start)

                // *** End programmer edit section *** (WorkType.Name Get start)
                string result = this.fName;
                // *** Start programmer edit section *** (WorkType.Name Get end)

                // *** End programmer edit section *** (WorkType.Name Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (WorkType.Name Set start)

                // *** End programmer edit section *** (WorkType.Name Set start)
                this.fName = value;
                // *** Start programmer edit section *** (WorkType.Name Set end)

                // *** End programmer edit section *** (WorkType.Name Set end)
            }
        }
        
        /// <summary>
        /// Comment.
        /// </summary>
        // *** Start programmer edit section *** (WorkType.Comment CustomAttributes)

        // *** End programmer edit section *** (WorkType.Comment CustomAttributes)
        [StrLen(255)]
        public virtual string Comment
        {
            get
            {
                // *** Start programmer edit section *** (WorkType.Comment Get start)

                // *** End programmer edit section *** (WorkType.Comment Get start)
                string result = this.fComment;
                // *** Start programmer edit section *** (WorkType.Comment Get end)

                // *** End programmer edit section *** (WorkType.Comment Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (WorkType.Comment Set start)

                // *** End programmer edit section *** (WorkType.Comment Set start)
                this.fComment = value;
                // *** Start programmer edit section *** (WorkType.Comment Set end)

                // *** End programmer edit section *** (WorkType.Comment Set end)
            }
        }
        
        /// <summary>
        /// Время создания объекта.
        /// </summary>
        // *** Start programmer edit section *** (WorkType.CreateTime CustomAttributes)

        // *** End programmer edit section *** (WorkType.CreateTime CustomAttributes)
        public virtual System.Nullable<System.DateTime> CreateTime
        {
            get
            {
                // *** Start programmer edit section *** (WorkType.CreateTime Get start)

                // *** End programmer edit section *** (WorkType.CreateTime Get start)
                System.Nullable<System.DateTime> result = this.fCreateTime;
                // *** Start programmer edit section *** (WorkType.CreateTime Get end)

                // *** End programmer edit section *** (WorkType.CreateTime Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (WorkType.CreateTime Set start)

                // *** End programmer edit section *** (WorkType.CreateTime Set start)
                this.fCreateTime = value;
                // *** Start programmer edit section *** (WorkType.CreateTime Set end)

                // *** End programmer edit section *** (WorkType.CreateTime Set end)
            }
        }
        
        /// <summary>
        /// Создатель объекта.
        /// </summary>
        // *** Start programmer edit section *** (WorkType.Creator CustomAttributes)

        // *** End programmer edit section *** (WorkType.Creator CustomAttributes)
        [StrLen(255)]
        public virtual string Creator
        {
            get
            {
                // *** Start programmer edit section *** (WorkType.Creator Get start)

                // *** End programmer edit section *** (WorkType.Creator Get start)
                string result = this.fCreator;
                // *** Start programmer edit section *** (WorkType.Creator Get end)

                // *** End programmer edit section *** (WorkType.Creator Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (WorkType.Creator Set start)

                // *** End programmer edit section *** (WorkType.Creator Set start)
                this.fCreator = value;
                // *** Start programmer edit section *** (WorkType.Creator Set end)

                // *** End programmer edit section *** (WorkType.Creator Set end)
            }
        }
        
        /// <summary>
        /// Время последнего редактирования объекта.
        /// </summary>
        // *** Start programmer edit section *** (WorkType.EditTime CustomAttributes)

        // *** End programmer edit section *** (WorkType.EditTime CustomAttributes)
        public virtual System.Nullable<System.DateTime> EditTime
        {
            get
            {
                // *** Start programmer edit section *** (WorkType.EditTime Get start)

                // *** End programmer edit section *** (WorkType.EditTime Get start)
                System.Nullable<System.DateTime> result = this.fEditTime;
                // *** Start programmer edit section *** (WorkType.EditTime Get end)

                // *** End programmer edit section *** (WorkType.EditTime Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (WorkType.EditTime Set start)

                // *** End programmer edit section *** (WorkType.EditTime Set start)
                this.fEditTime = value;
                // *** Start programmer edit section *** (WorkType.EditTime Set end)

                // *** End programmer edit section *** (WorkType.EditTime Set end)
            }
        }
        
        /// <summary>
        /// Последний редактор объекта.
        /// </summary>
        // *** Start programmer edit section *** (WorkType.Editor CustomAttributes)

        // *** End programmer edit section *** (WorkType.Editor CustomAttributes)
        [StrLen(255)]
        public virtual string Editor
        {
            get
            {
                // *** Start programmer edit section *** (WorkType.Editor Get start)

                // *** End programmer edit section *** (WorkType.Editor Get start)
                string result = this.fEditor;
                // *** Start programmer edit section *** (WorkType.Editor Get end)

                // *** End programmer edit section *** (WorkType.Editor Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (WorkType.Editor Set start)

                // *** End programmer edit section *** (WorkType.Editor Set start)
                this.fEditor = value;
                // *** Start programmer edit section *** (WorkType.Editor Set end)

                // *** End programmer edit section *** (WorkType.Editor Set end)
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
                    return ICSSoft.STORMNET.Information.GetView("AuditView", typeof(Cpmc.WorkType));
                }
            }
            
            /// <summary>
            /// "WorkTypeE" view.
            /// </summary>
            public static ICSSoft.STORMNET.View WorkTypeE
            {
                get
                {
                    return ICSSoft.STORMNET.Information.GetView("WorkTypeE", typeof(Cpmc.WorkType));
                }
            }
            
            /// <summary>
            /// "WorkTypeL" view.
            /// </summary>
            public static ICSSoft.STORMNET.View WorkTypeL
            {
                get
                {
                    return ICSSoft.STORMNET.Information.GetView("WorkTypeL", typeof(Cpmc.WorkType));
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