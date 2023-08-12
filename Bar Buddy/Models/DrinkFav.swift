//
//  Item.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/5/23.
//

import Foundation
import SwiftData

@Model
public final class DrinkFav {
    let strDrink: String?
    let strDrinkThumb: String?
    let strTags: String?
    let idDrink: String?
    let strInstructions: String?
    let strGlass: String?
    let strVideo: String?
    let strIngredient1,
              strIngredient2,
              strIngredient3,
              strIngredient4,
              strIngredient5,
              strIngredient6,
              strIngredient7,
              strIngredient8,
              strIngredient9,
              strIngredient10,
              strIngredient11,
              strIngredient12,
              strIngredient13,
              strIngredient14,
              strIngredient15:String?
    let strMeasure1,
              strMeasure2,
              strMeasure3,
              strMeasure4,
              strMeasure5,
              strMeasure6,
              strMeasure7,
              strMeasure8,
              strMeasure9,
              strMeasure10,
              strMeasure11,
              strMeasure12,
              strMeasure13,
              strMeasure14,
              strMeasure15: String?

    init(strDrink: String?,
              strDrinkThumb: String?,
              strTags: String?,
              idDrink: String?,
              strInstructions: String?,
              strGlass: String?,
              strVideo: String?,
              strIngredient1: String?,
              strIngredient2: String?,
              strIngredient3: String?,
              strIngredient4: String?,
              strIngredient5: String?,
              strIngredient6: String?,
              strIngredient7: String?,
              strIngredient8: String?,
              strIngredient9: String?,
              strIngredient10: String?,
              strIngredient11: String?,
              strIngredient12: String?,
              strIngredient13: String?,
              strIngredient14: String?,
              strIngredient15: String?,
              strMeasure1: String?,
              strMeasure2: String?,
              strMeasure3: String?,
              strMeasure4: String?,
              strMeasure5: String?,
              strMeasure6: String?,
              strMeasure7: String?,
              strMeasure8: String?,
              strMeasure9: String?,
              strMeasure10: String?,
              strMeasure11: String?,
              strMeasure12: String?,
              strMeasure13: String?,
              strMeasure14: String?,
              strMeasure15: String?) {
        self.strDrink = strDrink
        self.strDrinkThumb = strDrinkThumb
        self.strTags = strTags
        self.idDrink = idDrink
        self.strInstructions = strInstructions
        self.strGlass = strGlass
        self.strVideo = strVideo
        self.strIngredient1 = strIngredient1
        self.strIngredient2 = strIngredient2
        self.strIngredient3 = strIngredient3
        self.strIngredient4 = strIngredient4
        self.strIngredient5 = strIngredient5
        self.strIngredient6 = strIngredient6
        self.strIngredient7 = strIngredient7
        self.strIngredient8 = strIngredient8
        self.strIngredient9 = strIngredient9
        self.strIngredient10 = strIngredient10
        self.strIngredient11 = strIngredient11
        self.strIngredient12 = strIngredient12
        self.strIngredient13 = strIngredient13
        self.strIngredient14 = strIngredient14
        self.strIngredient15 = strIngredient15
        self.strMeasure1 = strMeasure1
        self.strMeasure2 = strMeasure2
        self.strMeasure3 = strMeasure3
        self.strMeasure4 = strMeasure4
        self.strMeasure5 = strMeasure5
        self.strMeasure6 = strMeasure6
        self.strMeasure7 = strMeasure7
        self.strMeasure8 = strMeasure8
        self.strMeasure9 = strMeasure9
        self.strMeasure10 = strMeasure10
        self.strMeasure11 = strMeasure11
        self.strMeasure12 = strMeasure12
        self.strMeasure13 = strMeasure13
        self.strMeasure14 = strMeasure14
        self.strMeasure15 = strMeasure15
    }
}

public func mapFaveDrink(_ drink: Drink) -> DrinkFav {
    DrinkFav(strDrink: drink.strDrink,
              strDrinkThumb: drink.strDrinkThumb,
              strTags: drink.strTags,
              idDrink: drink.idDrink,
              strInstructions: drink.strInstructions,
              strGlass: drink.strGlass,
              strVideo: drink.strVideo,
              strIngredient1: drink.strIngredient1,
              strIngredient2: drink.strIngredient2,
              strIngredient3: drink.strIngredient3,
              strIngredient4: drink.strIngredient4,
              strIngredient5: drink.strIngredient5,
              strIngredient6: drink.strIngredient6,
              strIngredient7: drink.strIngredient7,
              strIngredient8: drink.strIngredient8,
              strIngredient9: drink.strIngredient9,
              strIngredient10: drink.strIngredient10,
              strIngredient11: drink.strIngredient11,
              strIngredient12: drink.strIngredient12,
              strIngredient13: drink.strIngredient13,
              strIngredient14: drink.strIngredient14,
              strIngredient15: drink.strIngredient15,
              strMeasure1: drink.strMeasure1,
              strMeasure2: drink.strMeasure2,
              strMeasure3: drink.strMeasure3,
              strMeasure4: drink.strMeasure4,
              strMeasure5: drink.strMeasure5,
              strMeasure6: drink.strMeasure6,
              strMeasure7: drink.strMeasure7,
              strMeasure8: drink.strMeasure8,
              strMeasure9: drink.strMeasure9,
              strMeasure10: drink.strMeasure10,
              strMeasure11: drink.strMeasure11,
              strMeasure12: drink.strMeasure12,
              strMeasure13: drink.strMeasure13,
              strMeasure14: drink.strMeasure14,
              strMeasure15: drink.strMeasure15)
}

public func ReadFaveDrink(_ drink: DrinkFav) -> Drink {
    Drink(strDrink: drink.strDrink,
              strDrinkThumb: drink.strDrinkThumb,
              strTags: drink.strTags,
              idDrink: drink.idDrink,
              strInstructions: drink.strInstructions,
              strGlass: drink.strGlass,
              strVideo: drink.strVideo,
              strIngredient1: drink.strIngredient1,
              strIngredient2: drink.strIngredient2,
              strIngredient3: drink.strIngredient3,
              strIngredient4: drink.strIngredient4,
              strIngredient5: drink.strIngredient5,
              strIngredient6: drink.strIngredient6,
              strIngredient7: drink.strIngredient7,
              strIngredient8: drink.strIngredient8,
              strIngredient9: drink.strIngredient9,
              strIngredient10: drink.strIngredient10,
              strIngredient11: drink.strIngredient11,
              strIngredient12: drink.strIngredient12,
              strIngredient13: drink.strIngredient13,
              strIngredient14: drink.strIngredient14,
              strIngredient15: drink.strIngredient15,
              strMeasure1: drink.strMeasure1,
              strMeasure2: drink.strMeasure2,
              strMeasure3: drink.strMeasure3,
              strMeasure4: drink.strMeasure4,
              strMeasure5: drink.strMeasure5,
              strMeasure6: drink.strMeasure6,
              strMeasure7: drink.strMeasure7,
              strMeasure8: drink.strMeasure8,
              strMeasure9: drink.strMeasure9,
              strMeasure10: drink.strMeasure10,
              strMeasure11: drink.strMeasure11,
              strMeasure12: drink.strMeasure12,
              strMeasure13: drink.strMeasure13,
              strMeasure14: drink.strMeasure14,
              strMeasure15: drink.strMeasure15)
}
