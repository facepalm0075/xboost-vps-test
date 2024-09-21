import { extraOptionsType } from "@/app/components/types/Types";
import { toggleOptionsOrderDetailsType } from "../route";

export const toggleOptionsValidator = (
    boostDetailsT: toggleOptionsOrderDetailsType[],
    res: extraOptionsType
) => {
    // finding dublicates
    const strArray = boostDetailsT.map((index) => {
        return index.optionName;
    });
    const findDuplicates = (arr: string[]) =>
        arr.filter((item, index) => arr.indexOf(item) !== index);
    if (findDuplicates(strArray).length > 0) return "duplicate toggle options";

    // creating array of options in db
    const toggleOptionsList = res.map((item) => {
        return item.name;
    });
    for (let i = 0; i < boostDetailsT.length; i++) {
        if (!toggleOptionsList.includes(boostDetailsT[i].optionName))
            return "Invalid toggle options";
    }
    return "validated";
};
