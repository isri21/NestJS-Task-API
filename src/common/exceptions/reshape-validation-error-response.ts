import { BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { Error_Codes } from "../enums/ErrorCodes.js";

export const reShapeValidationErrorResponse = (errors: ValidationError[]) => {
	const details = errors.map((e) => {
		const property = e.property;
		const constraints = e.constraints ?? {};
		const constraintKeys = Object.keys(constraints);
		const errorList: string[] = [];

		for (const key of constraintKeys) {
			errorList.push(constraints[key]);
		}

		return { [property]: errorList };
	});

	let fieldErrors: { [type: string]: string[] } = {};
	for (const error of details) {
		const fieldName: string = Object.keys(error)[0];
		fieldErrors[fieldName] = error[fieldName];
	}

	return new BadRequestException({code: Error_Codes.VALIDATION_ERROR, message: "Validation Error", details: fieldErrors});
};