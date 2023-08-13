//
//  DrinkRow.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/6/23.
//

import SwiftUI

struct DrinkRow: View {
    var drink: Drink
    @State private var showDetails:Bool = false
    var body: some View {
        NavigationLink(destination: {
            DrinkDetails(drink: drink, dismiss: {
                showDetails = false
            })
        }, label: {
            VStack {
                if let url = drink.strDrinkThumb {
                    AsyncImage(url: URL(string: url))
                        .aspectRatio(contentMode: .fit)
                        .scaledToFit()
                        .frame(height: 200)
                        .clipped()
                        .padding(.horizontal)
                }
                HStack {
                    if let strDrink = drink.strDrink {
                        Text(strDrink)
                            .bold()
                            .font(.title)
                            .frame(alignment: .leading)
                            .lineLimit(3)
                            .multilineTextAlignment(.leading   )
                    }
                    Spacer()
                    if let tags = drink.strTags {
                        ScrollView {
                            Text(tags.replacingOccurrences(of: ",", with: "\n")).font(.footnote)
                                .multilineTextAlignment(.trailing   )
                        }
                        .frame(height: 50)
                    }
                }
            }.foregroundColor(.primary)
        }).frame(alignment: .center)
    }
}

#Preview {
    Popular()
}
