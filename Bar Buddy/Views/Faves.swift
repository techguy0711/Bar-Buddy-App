//
//  Faves.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/5/23.
//

import SwiftUI
import SwiftData

struct Faves: View {
    @Environment(\.modelContext) private var modelContext
    @Query private var queryFaveDrinks: [DrinkFav]
    @State private var faveDrinks: [DrinkFav] = []
    
    var body: some View {
        VStack(alignment: .center) {
            GeometryReader { geo in
                if queryFaveDrinks.isEmpty {
                    VStack(alignment: .center) {
                        Spacer()
                        HStack {
                            Spacer()
                            VStack {
                                Text("🙁")
                                    .scaleEffect(CGSize(width: 5.0, height: 5.0))
                                    .padding(50)
                                Text("No favorites yet!")
                                    .font(.title)
                            }
                            Spacer()
                        }
                        Spacer()
                    }
                } else {
                    List {
                        ForEach($faveDrinks, id: \.id, editActions: .delete) { drink in
                            DrinkRow(drink: ReadFaveDrink(drink.wrappedValue))
                                .frame(width: geo.size.width)
                        }.onDelete(perform: { indexSet in
                            deleteItems(offsets: indexSet)
                            faveDrinks = queryFaveDrinks
                        })
                    }
                }
            }
        }
        .onAppear(perform: {
            faveDrinks = queryFaveDrinks
        })
    }
    private func deleteItems(offsets: IndexSet) {
        withAnimation {
            for index in offsets {
                modelContext.delete(faveDrinks[index])
            }
        }
    }
}

#Preview {
    Faves()
}
