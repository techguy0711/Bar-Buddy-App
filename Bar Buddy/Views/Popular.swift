//
//  Popular.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/5/23.
//

import SwiftUI
import Combine

struct Popular: View {
    @ObservedObject var model = PopularLogic()
    var body: some View {
        NavigationStack {
            VStack {
                switch model.state {
                case .loading:
                    ListLoadingView()
                    //Fixes issue when on orientation change state gets stuck on loading
                        .onAppear(perform: {
                            DispatchQueue.main.asyncAfter(deadline: .now() + 10) {
                                Task {
                                    model.fetchPopularDrinksList()
                                }
                            }
                        })
                case .failed:
                    Text("4 oh 4").bold()
                case .success(let drinks):
                    DrinkList(drinks: drinks.drinks)
                }
            }.task {
                model.fetchPopularDrinksList()
            }
            .refreshable {
                model.fetchPopularDrinksList()
            }.navigationTitle("Popular")
        }
    }
}

#Preview {
    Popular()
}
