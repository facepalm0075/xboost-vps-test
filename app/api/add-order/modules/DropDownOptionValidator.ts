import { dropDownOptionsOrderDetailsType, rankBoostOrderDetailsType } from "../route";
import { options2Type } from "@/app/components/types/Types";

export const dropDownOptionValidator = (
	boostDetailsDD: dropDownOptionsOrderDetailsType[],
	res: options2Type
) => {
	// if number of request options not equals to db options
	if (boostDetailsDD.length !== res.length) return "Invalid number of options";

	// finding dublicates
	const strArray = boostDetailsDD.map((index) => {
		return index.optionName;
	});
	const findDuplicates = (arr: string[]) =>
		arr.filter((item, index) => arr.indexOf(item) !== index);
	if (findDuplicates(strArray).length > 0) return "duplicate drop down options";

	// changing db options type to one object
	const optionsChangedFormat = res.map((item) => {
		const items = item.items.map((item2) => {
			return item2.content;
		});
		return { title: item.title, content: items };
	});

	// if all request options have correct name and content
	let counterN = boostDetailsDD.length;
	let counterC = boostDetailsDD.length;
	boostDetailsDD.forEach((item3) => {
		optionsChangedFormat.forEach((item4) => {
			if (item3.optionName === item4.title) {
				counterN--;
				if (item4.content.includes(item3.optionContent)) counterC--;
			}
		});
	});
	if (counterN !== 0) return "Invalid option names";
	if (counterC !== 0) return "Invalid option contents";

	return "validated";
};
