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
        Button(action: {
            showDetails = true
        }, label: {
            VStack {
                if let url = drink.strDrinkThumb {
                    ZStack {
                        AsyncImage(url: URL(string: url))
                            .aspectRatio(contentMode: .fit)
                            .frame(height: 200)
                            .clipped()
                    }
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
                    Divider()
                        .frame(maxWidth: 120)
                    if let tags = drink.strTags {
                        ScrollView {
                            Text(tags.replacingOccurrences(of: ",", with: "\n")).font(.footnote)
                                .multilineTextAlignment(.trailing   )
                        }
                        .frame(height: 50)
                    }
                }
            }.foregroundColor(.primary)
        })
        .fullScreenCover(isPresented: $showDetails, content: {
            DrinkDetails(drink: drink, dismiss: {
                showDetails = false
            })
                .onDisappear {
                    showDetails = false
                }
        }).frame(alignment: .center)
    }
}

#Preview {
    Popular()
}
