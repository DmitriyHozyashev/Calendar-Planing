import Ember from 'ember';

export default Ember.Component.extend({
  planData: undefined,
  actions: {
    getPrintContent() {
      let planHeader = `<p> Наименование плана: ${this.get('planData.name')} </p>
                      <p> Дата создания: ${this.get('planData.createTime')} </p>
                      <p> Создатель: ${this.get('planData.creator')} </p>
                      <p> Дата редактирования: ${this.get('planData.editTime')} </p>
                      <p> Редактор: ${this.get('planData.editor')} </p>
                      <p> График выполнения работ </p>`;
      let planFooter = `<p> Суммарная длительность выполнения работ: ${this.get('planData.totalTime')}</p>
                        <p> График: ${this.get('planData.planJSON')}</p>`;
      var divToPrint = document.getElementById('ganttChart');

      var newWin = window.open('','Print-Window');
      newWin.document.open();
      newWin.document.write(`<html><body onload="window.print()"> ${planHeader} ${divToPrint.innerHTML} ${planFooter}</body></html>`);
      newWin.document.close();
      setTimeout(function(){ newWin.close();}, 10);
    }
  }
});
