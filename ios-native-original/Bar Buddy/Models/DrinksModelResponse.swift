//
//  PopularModels.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/6/23.
//

import Foundation

public struct DrinksModelResponse: Codable {
    public let drinks: [Drink]
}

public struct Drink: Codable {
    public let strDrink: String?
    public let strDrinkThumb: String?
    public let strTags: String?
    public let idDrink: String?
    public let strInstructions: String?
    public let strGlass: String?
    public let strVideo: String?
    public let strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15:String?
    public let strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12, strMeasure13, strMeasure14, strMeasure15: String?
}
