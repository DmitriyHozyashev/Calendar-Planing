package sample;

import sample.ModelClasses.OpersModel;

import java.util.*;

public class Methods {
    //Алгоритм Джонсона
    public ArrayList johnsonAlgorithm(ArrayList<ArrayList<OpersModel>> mapList, int deviceNumber){
        ArrayList<Integer> arrTop = new ArrayList<>();
        ArrayList<Integer> arrBottom = new ArrayList<>();
        ArrayList<ArrayList<OpersModel>> copyList = new ArrayList<>();
        ArrayList<ArrayList<OpersModel>> copyListM = new ArrayList<>();
        if (deviceNumber == 2) {
            for (int i = 0; i < mapList.size(); i++) {
                copyList.add(new ArrayList<>());
                copyListM.add(new ArrayList<>());
                for (OpersModel opm : mapList.get(i)) {
                    copyList.get(i).add(opm);
                    copyListM.get(i).add(opm);
                }
            }
        }
        if (deviceNumber == 3){
            for (int i =0, j=1; j < mapList.size(); i++, j++) {
                copyList.add(new ArrayList<>());
                copyListM.add(new ArrayList<>());
                for (int k = 0; k < mapList.get(0).size(); k++) {
                    OpersModel opm = new OpersModel(mapList.get(i).get(k).getOper_ID(), mapList.get(i).get(k).getOper_Name(), mapList.get(i).get(k).getReq_ID(), mapList.get(i).get(k).getReq_Name(), mapList.get(i).get(k).getOper_Duration() + mapList.get(j).get(k).getOper_Duration(), mapList.get(i).get(k).getDevice_ID(), mapList.get(i).get(k).getDevice_Name(), mapList.get(i).get(k).getDevice_Order());
                    copyList.get(i).add(opm);
                    copyListM.get(i).add(opm);
                }
            }
        }
        while (copyListM.get(0).size() != 0){
            OpersModel op1 = Collections.min(copyListM.get(0), Comparator.comparing(op -> op.getOper_Duration()));
            OpersModel op2 = Collections.min(copyListM.get(1), Comparator.comparing(op -> op.getOper_Duration()));
            int index = 0;
            int indexCopy = 0;
            if (op1.getOper_Duration() <= op2.getOper_Duration()){
                index = copyList.get(0).indexOf(op1);
                indexCopy = copyListM.get(0).indexOf(op1);
                arrTop.add(index);
            }else {
                index = copyList.get(1).indexOf(op2);
                indexCopy = copyListM.get(1).indexOf(op2);
                arrBottom.add(0, index);
            }
            copyListM.get(0).remove(indexCopy);
            copyListM.get(1).remove(indexCopy);
        }
        arrTop.addAll(arrBottom);
        ArrayList<ArrayList<OpersModel>> sortedMap = new ArrayList<>();
        for (int i =0; i < mapList.size(); i++)
            sortedMap.add(new ArrayList<>());
        for (int i=0; i<sortedMap.size(); i++)
            for (int j = 0; j < arrTop.size(); j++)
                sortedMap.get(i).add(mapList.get(i).get(arrTop.get(j)));
        sortedMap = sortMapByPath(sortedMap, false);
        return sortedMap;
    }

    public ArrayList randomDetail(ArrayList<ArrayList<OpersModel>> mapList){
        for (int i = 0; i<mapList.size(); i++)
            for (int j = 0; j<mapList.get(i).size(); j++)
                if (mapList.get(i).get(j) == null)
                    mapList.get(i).remove(j);
        for (int i=0; i < mapList.size(); i++)
            Collections.shuffle(mapList.get(i), new Random());
        mapList = sortMapByPath(mapList, false);
        return mapList;
    }

    public ArrayList operationsNumber(ArrayList<ArrayList<OpersModel>> mapList){
        for (int i = 0; i<mapList.size(); i++)
            Collections.sort(mapList.get(i), Comparator.nullsLast(Comparator.comparing(OpersModel :: getDevice_Order)));
        mapList = sortMapByPath(mapList, false);
        return mapList;
    }

    public ArrayList minMaxLabor(ArrayList<ArrayList<OpersModel>> mapList, int choose){
        for (int i = 0; i<mapList.size(); i++)
            for (int j = 0; j<mapList.get(i).size(); j++)
                if (mapList.get(i).get(j) == null)
                    mapList.get(i).remove(j);
        Comparator c = null;
        if (choose == 0)
            c = Collections.reverseOrder(Comparator.nullsLast(Comparator.comparing(OpersModel :: getOper_Duration)));
        else
            c = Comparator.nullsLast(Comparator.comparing(OpersModel :: getOper_Duration));
        for (int i =0; i<mapList.size(); i++)
            Collections.sort(mapList.get(i), c);
        mapList = sortMapByPath(mapList, false);
        return mapList;
    }

    public ArrayList sortMapByPath(ArrayList<ArrayList<OpersModel>> mapList, boolean n){
        for (int i = 0; i < mapList.size(); i++) {
            for (int j = 0; j < mapList.size(); j++) {
                for (int k = 0; k < mapList.get(j).size(); k++){
                    if (mapList.get(j).get(k) != null && mapList.get(j).get(k).getDevice_Order() == i+1) {
                        String reqName1 = "";
                        int devOrd1 = -1;
                        if (mapList.get(j).get(k) != null) {
                            reqName1 = mapList.get(j).get(k).getReq_Name();
                            devOrd1 = mapList.get(j).get(k).getDevice_Order();
                        }
                        for (int l = 0; l < mapList.size(); l++)
                            for (int m = 0; m < mapList.get(l).size(); m++) {
                                String reqName2 = "";
                                int devOrd2 = -1;
                                if (mapList.get(l).get(m) != null) {
                                    reqName2 = mapList.get(l).get(m).getReq_Name();
                                    devOrd2 = mapList.get(l).get(m).getDevice_Order();
                                }
                                if (mapList.get(l).get(m) != null && reqName1.equals(reqName2) && devOrd1 < devOrd2 && m<=k) {
                                    n = true;
                                    OpersModel opm = mapList.get(l).get(m);
                                    if (k+1 > mapList.get(l).size()) {
                                        mapList.get(l).add(null);
                                        mapList.get(l).add(opm);
                                    }
                                    else
                                        mapList.get(l).add(k + 1, opm);
                                    mapList.get(l).set(m, null);
                                }
                            }
                    }
                }
            }
        }
        if (n)
            sortMapByPath(mapList, false);
        return mapList;
    }

    public ArrayList geneticAlgorithm(ArrayList<ArrayList<OpersModel>> mapList){
        for (int i = 0; i<mapList.size(); i++) {
            for (int j = 0; j < mapList.get(i).size(); j++)
                if (mapList.get(i).get(j) == null)
                    mapList.get(i).remove(j);
        }
        ArrayList<OpersModel> mParent = new ArrayList<>();
        for (int i =0; i < mapList.size(); i++) {
            for (OpersModel op : mapList.get(i))
                mParent.add(op);
        }
        ArrayList <ArrayList<OpersModel>> parentPop = new ArrayList<>();

        for (int i = 0; i <50; i++){
            parentPop.add(new ArrayList<>());
            for (OpersModel op : mParent)
                parentPop.get(i).add(op);
            Collections.shuffle(parentPop, new Random(50));
        }
        parentPop = sortGenetic(parentPop);
        while (parentPop.size() != 1)
            parentPop = selectionF(parentPop);
        return parentPop;
    }

    public ArrayList selectionF(ArrayList<ArrayList<OpersModel>> parentPop){
        ArrayList<ArrayList<OpersModel>> selectedPop = new ArrayList<>();
        Random rnd = new Random();
        double fitValue = fitnessF(parentPop.get(rnd.nextInt(parentPop.size())));
        for (int i =0; i<parentPop.size(); i++){
            selectedPop.add(new ArrayList<>());
            double sumDuration = 0;
            for (OpersModel op : parentPop.get(i))
                sumDuration += op.getOper_Duration();
            if (sumDuration <= fitValue)
                selectedPop.add(parentPop.get(i));
        }
        return crossF(selectedPop);
    }

    public ArrayList crossF(ArrayList<ArrayList<OpersModel>> selectedPop){
        ArrayList<ArrayList<OpersModel>> offspringPop = new ArrayList<>();
        for (int i =0;  i < selectedPop.size(); i++)
            Collections.shuffle(selectedPop, new Random(5));
        Random rnd = new Random();
        int rndind =0;
        for (int i=0; i< selectedPop.size(); i++) {
            rndind = rnd.nextInt(selectedPop.size());
            ArrayList<OpersModel> subList = (ArrayList<OpersModel>) selectedPop.get(rndind).subList(rnd.nextInt(selectedPop.get(rndind).size()), rnd.nextInt(selectedPop.get(rndind).size()));
            OpersModel op = subList.get(0);
            rndind = rnd.nextInt(selectedPop.size());
            ArrayList<OpersModel> list = selectedPop.get(rndind);
            for (int j = 0; j<subList.size();j++)
                Collections.replaceAll(list, subList.get(j), null);
            int index = list.indexOf(op);
            list.addAll(index, subList);
            list.remove(null);
            offspringPop.add(list);
        }
        return mutationF(offspringPop);
    }

    public ArrayList mutationF(ArrayList<ArrayList<OpersModel>> offspringPop){
        Random rnd = new Random();
        int rndind = 0;
        for (int i = 0; i<offspringPop.size();i++){
            ArrayList<OpersModel> list = offspringPop.get(i);
            rndind = rnd.nextInt(list.size());
            OpersModel op = list.get(rndind);
            OpersModel op1;
            if (op.getDevice_Order() == 1)
                op1 = new OpersModel(op.getOper_ID(), op.getOper_Name(),op.getReq_ID(),op.getReq_Name(),op.getOper_Duration(),op.getDevice_ID(), op.getDevice_Name(), (op.getDevice_Order()+1));
            else
                op1 = new OpersModel(op.getOper_ID(), op.getOper_Name(),op.getReq_ID(),op.getReq_Name(),op.getOper_Duration(),op.getDevice_ID(), op.getDevice_Name(), (op.getDevice_Order()-1));
            int index = list.indexOf(op1);
            if (index < rndind)
                index = rnd.nextInt((rndind-1 - index+1) +1)+index+1;
            else
                index = rnd.nextInt((index-1 - rndind+1) +1)+rndind+1;
            list.remove(op);
            list.add(index, op);
            for (OpersModel opm : list)
                if (op.getReq_ID() == opm.getReq_ID() && op.getDevice_Order() < opm.getDevice_Order()){
                    int ind = list.lastIndexOf(opm);
                    list.remove(opm);
                    list.add((ind+1), opm);
                }
        }
        return offspringPop;
    }

    public double fitnessF(ArrayList<OpersModel> genomeListOfspring){
        double fitValue = 0;
        for (OpersModel op : genomeListOfspring)
            fitValue += op.getOper_Duration();
        return fitValue;
    }

    public ArrayList sortGenetic(ArrayList<ArrayList<OpersModel>> parentPop){
        boolean sort = true;
        while (!sort)
            for (int i =0; i<parentPop.size(); i++){
                for (int j = 0; j < parentPop.get(i).size(); j++) {
                    for (int k = 0; k < parentPop.get(i). size(); k++)
                        if (parentPop.get(i).get(j).getReq_ID() == parentPop.get(i).get(k).getReq_ID() && parentPop.get(i).get(j).getDevice_Order() < parentPop.get(i).get(k).getDevice_Order() && j<k)
                        {
                            OpersModel op = parentPop.get(i).get(j);
                            if (k+1 > parentPop.get(i).size())
                                parentPop.get(i).add(op);
                            else
                                parentPop.get(i).set(k+1, op);
                            parentPop.get(i).remove(j);
                            sort = false;
                        }
                }
            }
        return parentPop;
    }
}
