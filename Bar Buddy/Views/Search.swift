//
//  Search.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/5/23.
//

import SwiftUI

struct Search: View {
    @ObservedObject var model = SearchLogic()
    @State private var searchText: String = ""
    @State private var isSearching:Bool = false
    var body: some View {
        NavigationStack {
            VStack {
                    switch model.state {
                    case .loading:
                        ListLoadingView()
                    case .failed:
                        Text("4 oh 4")
                    case .success(let drinks):
                        if drinks.drinks.isEmpty {
                            Text("No results")
                        } else {
                            DrinkList(drinks: drinks.drinks)
                        }
                    }
            }.animation(.easeInOut, value: 10)
                .onAppear {
                    Task {
                        await model.fetchDrinksListResults(searchText:searchText)
                    }
                }.navigationTitle("Search")
        }.searchable(text: $searchText, isPresented: $isSearching)
            .onSubmit(of: .search) {
                Task {
                    await model.fetchDrinksListResults(searchText:searchText)
                }
            }
    }
}

#Preview {
    Search()
}
