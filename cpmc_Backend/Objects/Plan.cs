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
    /// План.
    /// </summary>
    // *** Start programmer edit section *** (Plan CustomAttributes)

    // *** End programmer edit section *** (Plan CustomAttributes)
    [AutoAltered()]
    [Caption("План")]
    [AccessType(ICSSoft.STORMNET.AccessType.none)]
    [View("AuditView", new string[] {
            "Name as \'Name\'",
            "Algorithm as \'Algorithm\'",
            "TotalTime as \'Total time\'",
            "State as \'State\'"})]
    [AssociatedDetailViewAttribute("AuditView", "PlanItem", "AuditView", true, "", "Plan item", true, new string[] {
            ""})]
    [View("PlanE", new string[] {
            "Name as \'Наименование\'",
            "State as \'Состояние\'",
            "Algorithm as \'Алгоритм вычисления\'",
            "TotalTime as \'Общее время\'",
            "PlanJSON"}, Hidden=new string[] {
            "PlanJSON"})]
    [AssociatedDetailViewAttribute("PlanE", "PlanItem", "PlanItemE", true, "", "Строка плана", true, new string[] {
            ""})]
    [View("PlanL", new string[] {
            "Name as \'Наименование\'",
            "State as \'Состояние\'",
            "Algorithm as \'Алгоритм вычисления\'",
            "TotalTime as \'Общее время\'",
            "CreateTime as \'Дата создания\'",
            "Creator as \'Создатель\'",
            "EditTime as \'Дата редактрвоания\'",
            "Editor as \'Редактор\'"})]
    [AssociatedDetailViewAttribute("PlanL", "PlanItem", "PlanItemE", true, "ДСЕ", "", true, new string[] {
            ""})]
    public class Plan : ICSSoft.STORMNET.DataObject, IDataObjectWithAuditFields
    {
        
        private string fName;
        
        private Cpmc.tPlanAlgorithm fAlgorithm;
        
        private string fPlanJSON;
        
        private double fTotalTime;
        
        private Cpmc.tPlanState fState;
        
        private System.Nullable<System.DateTime> fCreateTime;
        
        private string fCreator;
        
        private System.Nullable<System.DateTime> fEditTime;
        
        private string fEditor;
        
        private Cpmc.DetailArrayOfPlanItem fPlanItem;
        
        // *** Start programmer edit section *** (Plan CustomMembers)

        // *** End programmer edit section *** (Plan CustomMembers)

        
        /// <summary>
        /// Name.
        /// </summary>
        // *** Start programmer edit section *** (Plan.Name CustomAttributes)

        // *** End programmer edit section *** (Plan.Name CustomAttributes)
        [StrLen(255)]
        public virtual string Name
        {
            get
            {
                // *** Start programmer edit section *** (Plan.Name Get start)

                // *** End programmer edit section *** (Plan.Name Get start)
                string result = this.fName;
                // *** Start programmer edit section *** (Plan.Name Get end)

                // *** End programmer edit section *** (Plan.Name Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Plan.Name Set start)

                // *** End programmer edit section *** (Plan.Name Set start)
                this.fName = value;
                // *** Start programmer edit section *** (Plan.Name Set end)

                // *** End programmer edit section *** (Plan.Name Set end)
            }
        }
        
        /// <summary>
        /// Algorithm.
        /// </summary>
        // *** Start programmer edit section *** (Plan.Algorithm CustomAttributes)

        // *** End programmer edit section *** (Plan.Algorithm CustomAttributes)
        public virtual Cpmc.tPlanAlgorithm Algorithm
        {
            get
            {
                // *** Start programmer edit section *** (Plan.Algorithm Get start)

                // *** End programmer edit section *** (Plan.Algorithm Get start)
                Cpmc.tPlanAlgorithm result = this.fAlgorithm;
                // *** Start programmer edit section *** (Plan.Algorithm Get end)

                // *** End programmer edit section *** (Plan.Algorithm Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Plan.Algorithm Set start)

                // *** End programmer edit section *** (Plan.Algorithm Set start)
                this.fAlgorithm = value;
                // *** Start programmer edit section *** (Plan.Algorithm Set end)

                // *** End programmer edit section *** (Plan.Algorithm Set end)
            }
        }
        
        /// <summary>
        /// PlanJSON.
        /// </summary>
        // *** Start programmer edit section *** (Plan.PlanJSON CustomAttributes)

        // *** End programmer edit section *** (Plan.PlanJSON CustomAttributes)
        public virtual string PlanJSON
        {
            get
            {
                // *** Start programmer edit section *** (Plan.PlanJSON Get start)

                // *** End programmer edit section *** (Plan.PlanJSON Get start)
                string result = this.fPlanJSON;
                // *** Start programmer edit section *** (Plan.PlanJSON Get end)

                // *** End programmer edit section *** (Plan.PlanJSON Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Plan.PlanJSON Set start)

                // *** End programmer edit section *** (Plan.PlanJSON Set start)
                this.fPlanJSON = value;
                // *** Start programmer edit section *** (Plan.PlanJSON Set end)

                // *** End programmer edit section *** (Plan.PlanJSON Set end)
            }
        }
        
        /// <summary>
        /// TotalTime.
        /// </summary>
        // *** Start programmer edit section *** (Plan.TotalTime CustomAttributes)

        // *** End programmer edit section *** (Plan.TotalTime CustomAttributes)
        public virtual double TotalTime
        {
            get
            {
                // *** Start programmer edit section *** (Plan.TotalTime Get start)

                // *** End programmer edit section *** (Plan.TotalTime Get start)
                double result = this.fTotalTime;
                // *** Start programmer edit section *** (Plan.TotalTime Get end)

                // *** End programmer edit section *** (Plan.TotalTime Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Plan.TotalTime Set start)

                // *** End programmer edit section *** (Plan.TotalTime Set start)
                this.fTotalTime = value;
                // *** Start programmer edit section *** (Plan.TotalTime Set end)

                // *** End programmer edit section *** (Plan.TotalTime Set end)
            }
        }
        
        /// <summary>
        /// State.
        /// </summary>
        // *** Start programmer edit section *** (Plan.State CustomAttributes)

        // *** End programmer edit section *** (Plan.State CustomAttributes)
        public virtual Cpmc.tPlanState State
        {
            get
            {
                // *** Start programmer edit section *** (Plan.State Get start)

                // *** End programmer edit section *** (Plan.State Get start)
                Cpmc.tPlanState result = this.fState;
                // *** Start programmer edit section *** (Plan.State Get end)

                // *** End programmer edit section *** (Plan.State Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Plan.State Set start)

                // *** End programmer edit section *** (Plan.State Set start)
                this.fState = value;
                // *** Start programmer edit section *** (Plan.State Set end)

                // *** End programmer edit section *** (Plan.State Set end)
            }
        }
        
        /// <summary>
        /// Время создания объекта.
        /// </summary>
        // *** Start programmer edit section *** (Plan.CreateTime CustomAttributes)

        // *** End programmer edit section *** (Plan.CreateTime CustomAttributes)
        public virtual System.Nullable<System.DateTime> CreateTime
        {
            get
            {
                // *** Start programmer edit section *** (Plan.CreateTime Get start)

                // *** End programmer edit section *** (Plan.CreateTime Get start)
                System.Nullable<System.DateTime> result = this.fCreateTime;
                // *** Start programmer edit section *** (Plan.CreateTime Get end)

                // *** End programmer edit section *** (Plan.CreateTime Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Plan.CreateTime Set start)

                // *** End programmer edit section *** (Plan.CreateTime Set start)
                this.fCreateTime = value;
                // *** Start programmer edit section *** (Plan.CreateTime Set end)

                // *** End programmer edit section *** (Plan.CreateTime Set end)
            }
        }
        
        /// <summary>
        /// Создатель объекта.
        /// </summary>
        // *** Start programmer edit section *** (Plan.Creator CustomAttributes)

        // *** End programmer edit section *** (Plan.Creator CustomAttributes)
        [StrLen(255)]
        public virtual string Creator
        {
            get
            {
                // *** Start programmer edit section *** (Plan.Creator Get start)

                // *** End programmer edit section *** (Plan.Creator Get start)
                string result = this.fCreator;
                // *** Start programmer edit section *** (Plan.Creator Get end)

                // *** End programmer edit section *** (Plan.Creator Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Plan.Creator Set start)

                // *** End programmer edit section *** (Plan.Creator Set start)
                this.fCreator = value;
                // *** Start programmer edit section *** (Plan.Creator Set end)

                // *** End programmer edit section *** (Plan.Creator Set end)
            }
        }
        
        /// <summary>
        /// Время последнего редактирования объекта.
        /// </summary>
        // *** Start programmer edit section *** (Plan.EditTime CustomAttributes)

        // *** End programmer edit section *** (Plan.EditTime CustomAttributes)
        public virtual System.Nullable<System.DateTime> EditTime
        {
            get
            {
                // *** Start programmer edit section *** (Plan.EditTime Get start)

                // *** End programmer edit section *** (Plan.EditTime Get start)
                System.Nullable<System.DateTime> result = this.fEditTime;
                // *** Start programmer edit section *** (Plan.EditTime Get end)

                // *** End programmer edit section *** (Plan.EditTime Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Plan.EditTime Set start)

                // *** End programmer edit section *** (Plan.EditTime Set start)
                this.fEditTime = value;
                // *** Start programmer edit section *** (Plan.EditTime Set end)

                // *** End programmer edit section *** (Plan.EditTime Set end)
            }
        }
        
        /// <summary>
        /// Последний редактор объекта.
        /// </summary>
        // *** Start programmer edit section *** (Plan.Editor CustomAttributes)

        // *** End programmer edit section *** (Plan.Editor CustomAttributes)
        [StrLen(255)]
        public virtual string Editor
        {
            get
            {
                // *** Start programmer edit section *** (Plan.Editor Get start)

                // *** End programmer edit section *** (Plan.Editor Get start)
                string result = this.fEditor;
                // *** Start programmer edit section *** (Plan.Editor Get end)

                // *** End programmer edit section *** (Plan.Editor Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Plan.Editor Set start)

                // *** End programmer edit section *** (Plan.Editor Set start)
                this.fEditor = value;
                // *** Start programmer edit section *** (Plan.Editor Set end)

                // *** End programmer edit section *** (Plan.Editor Set end)
            }
        }
        
        /// <summary>
        /// План.
        /// </summary>
        // *** Start programmer edit section *** (Plan.PlanItem CustomAttributes)

        // *** End programmer edit section *** (Plan.PlanItem CustomAttributes)
        public virtual Cpmc.DetailArrayOfPlanItem PlanItem
        {
            get
            {
                // *** Start programmer edit section *** (Plan.PlanItem Get start)

                // *** End programmer edit section *** (Plan.PlanItem Get start)
                if ((this.fPlanItem == null))
                {
                    this.fPlanItem = new Cpmc.DetailArrayOfPlanItem(this);
                }
                Cpmc.DetailArrayOfPlanItem result = this.fPlanItem;
                // *** Start programmer edit section *** (Plan.PlanItem Get end)

                // *** End programmer edit section *** (Plan.PlanItem Get end)
                return result;
            }
            set
            {
                // *** Start programmer edit section *** (Plan.PlanItem Set start)

                // *** End programmer edit section *** (Plan.PlanItem Set start)
                this.fPlanItem = value;
                // *** Start programmer edit section *** (Plan.PlanItem Set end)

                // *** End programmer edit section *** (Plan.PlanItem Set end)
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
                    return ICSSoft.STORMNET.Information.GetView("AuditView", typeof(Cpmc.Plan));
                }
            }
            
            /// <summary>
            /// "PlanE" view.
            /// </summary>
            public static ICSSoft.STORMNET.View PlanE
            {
                get
                {
                    return ICSSoft.STORMNET.Information.GetView("PlanE", typeof(Cpmc.Plan));
                }
            }
            
            /// <summary>
            /// "PlanL" view.
            /// </summary>
            public static ICSSoft.STORMNET.View PlanL
            {
                get
                {
                    return ICSSoft.STORMNET.Information.GetView("PlanL", typeof(Cpmc.Plan));
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
            public static bool UseDefaultView = true;
            
            /// <summary>
            /// Включён ли аудит операции чтения.
            /// </summary>
            public static bool SelectAudit = true;
            
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
