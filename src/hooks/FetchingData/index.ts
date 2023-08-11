import { UseQueryResult, useQuery } from "react-query";
import { ParcellsType } from "../../common/types";
import { getParcells } from "../../firebase/api";

export function useGetParcells(): UseQueryResult<ParcellsType[], Error> {
    return useQuery(['parcells'], getParcells)
}