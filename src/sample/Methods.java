package sample;

import sample.ModelClasses.OpersModel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Random;

public class Methods {

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
}
