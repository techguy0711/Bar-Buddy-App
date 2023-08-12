//
//  DrinkList.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/6/23.
//

import SwiftUI

struct DrinkList: View {
    var drinks: [Drink]
    var body: some View {
        GeometryReader { geo in
                List {
                    ForEach(drinks, id: \.idDrink) { drink in
                        DrinkRow(drink: drink).frame(width: geo.size.width/1.1)
                    }
                }
        }
    }
}
