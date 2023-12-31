//
//  DrinkDetails.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/6/23.
//

import SwiftUI
import SwiftData
import Combine

struct DrinkDetails: View {
    var drink: Drink
    @State var dismiss: () -> Void
    @Environment(\.modelContext) private var modelContext
    @Query private var faveDrinks: [DrinkFav]
    @ObservedObject var model = DrinkDetailsLogic()

    var body: some View {
            GeometryReader { geo in
                ScrollView(.vertical) {
                    VStack {
                        if let video = drink.strVideo {
                            YouTubeView(url: video)
                                .scaledToFit()
                                .frame(width: geo.size.width, height: geo.size.height / 2.5)
                        } else {
                            if let thumbnail = drink.strDrinkThumb {
                                AsyncImage(url: URL(string: thumbnail))
                                    .aspectRatio(contentMode: .fit)
                                    .frame(width: geo.size.width, height: geo.size.height / 2.5)
                                    .clipped()
                            }
                        }
                        if let description = drink.strInstructions {
                            Text(description)
                                .padding()
                        }
                        HStack {
                            if drink.strIngredient1 == nil {
                                switch model.state {
                                case .success(let drink):
                                    IngredientsView(drink: drink)
                                        .padding(.leading)
                                default:
                                    EmptyView()
                                }
                            } else {
                                IngredientsView(drink: drink)
                                    .padding(.leading)
                            }
                            Spacer()
                        }.padding(.bottom)
                            .task {
                                if drink.strIngredient1 == nil {
                                    model.fetchDrinkDetails(id: drink.idDrink ?? "")
                                }
                            }
                        if faveDrinks.contains(where: { faves in
                            mapFaveDrink(drink).strDrink == faves.strDrink
                        }) == false {
                            Spacer(minLength: 40)
                            Button(action: {
                                withAnimation {
                                    modelContext.insert(mapFaveDrink(drink))
                                }
                            }, label: {
                                HStack {
                                    Image(systemName: "star.fill")
                                    Text("Add to Favorites")
                                }
                                .padding()
                            }).buttonStyle(FavoritesButtonStyle())
                        }
                    }
                }
            }.navigationTitle(drink.strDrink ?? "")
            .navigationBarTitleDisplayMode(.inline)
    }
}

struct IngredientsView: View {
    var drink: Drink
    
    var body: some View {
        VStack(alignment: .leading) {
            if let strIngredient1 = drink.strIngredient1 {
                if let strMeasure1 = drink.strMeasure1 {
                    Text("Ingredients:").bold().font(.title)
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient2 {
                if let strMeasure1 = drink.strMeasure2 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient3 {
                if let strMeasure1 = drink.strMeasure3 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient4 {
                if let strMeasure1 = drink.strMeasure4 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient5 {
                if let strMeasure1 = drink.strMeasure5 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient6 {
                if let strMeasure1 = drink.strMeasure6 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient7 {
                if let strMeasure1 = drink.strMeasure7 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient8 {
                if let strMeasure1 = drink.strMeasure8 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient9 {
                if let strMeasure1 = drink.strMeasure9 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient10 {
                if let strMeasure1 = drink.strMeasure10 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient11 {
                if let strMeasure1 = drink.strMeasure11 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient12 {
                if let strMeasure1 = drink.strMeasure12 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient13 {
                if let strMeasure1 = drink.strMeasure13 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient14 {
                if let strMeasure1 = drink.strMeasure14 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
            if let strIngredient1 = drink.strIngredient15 {
                if let strMeasure1 = drink.strMeasure15 {
                    IngredientView(strIngredient1: strIngredient1, strMeasure1: strMeasure1)
                }
            }
        }.frame(maxWidth: .infinity, alignment: .leading)
    }
}

struct IngredientView: View {
    var strIngredient1:String
    var strMeasure1:String
    var body: some View {
        HStack(alignment: .firstTextBaseline) {
            Image(systemName: "checkmark.circle")
                .foregroundColor(.green.opacity(0.5))
            Text("\(strIngredient1):")
            Text(strMeasure1)
        }.padding(.trailing)
    }
}

#Preview {
    DrinkDetails(drink: .init(strDrink: "Old fashion",
                              strDrinkThumb: "",
                              strTags: "",
                              idDrink: "69420",
                              strInstructions: "Mix like a boss, add as much alcohol as you need. Get recked. Drink safe and mke the best. Its old and tasted like dry whisky. I need this string to be super long so I can scroll. I like strong drinks that kick my ass. Dont judge its a string written in Swift idk.",
                              strGlass: "Tall Square",
                              strVideo: "https://www.youtube.com/watch?v=MnEQpNUYhGE",
                              strIngredient1: "Ingredient 1",
                              strIngredient2: "Ingredient 2",
                              strIngredient3: "Ingredient 3",
                              strIngredient4: "Ingredient 4",
                              strIngredient5: "Ingredient 5",
                              strIngredient6: "Ingredient 6",
                              strIngredient7: "Ingredient 7",
                              strIngredient8: "Ingredient 8",
                              strIngredient9: "Ingredient 9",
                              strIngredient10: "Ingredient 10",
                              strIngredient11: "Ingredient 11",
                              strIngredient12: "Ingredient 12",
                              strIngredient13: "Ingredient 13",
                              strIngredient14: "Ingredient 14",
                              strIngredient15: "Ingredient 15",
                              strMeasure1: "Measure 1",
                              strMeasure2: "Measure 2",
                              strMeasure3: "Measure 3",
                              strMeasure4: "Measure 4",
                              strMeasure5: "Measure 5",
                              strMeasure6: "Measure 6",
                              strMeasure7: "Measure 7",
                              strMeasure8: "Measure 8",
                              strMeasure9: "Measure 9",
                              strMeasure10: "Measure 10",
                              strMeasure11: "Measure 11",
                              strMeasure12: "Measure 12",
                              strMeasure13: "Measure 13",
                              strMeasure14: "Measure 14",
                              strMeasure15: "Measure 15"), dismiss: {})
}
