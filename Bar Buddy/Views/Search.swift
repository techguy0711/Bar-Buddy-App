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
                    //Fixes issue when on orientation change state gets stuck on loading
                        .onAppear(perform: {
                            DispatchQueue.main.asyncAfter(deadline: .now() + 10) {
                                model.fetchDrinksListResults(searchText:searchText)
                            }
                        })
                case .failed:
                    Text("4 oh 4")
                case .noResults:
                    NoResultsView(searchText: searchText)
                case .success(let drinks):
                    if drinks.drinks.isEmpty {
                        NoResultsView(searchText: searchText)
                    } else {
                        DrinkList(drinks: drinks.drinks)
                    }
                }
            }.animation(.easeInOut, value: 10)
                .onAppear {
                    model.fetchDrinksListResults(searchText:searchText)
                }.navigationTitle("Search")
        }.searchable(text: $searchText, isPresented: $isSearching)
            .onChange(of: isSearching, { oldValue, newValue in
                if !isSearching && searchText.isEmpty {
                    model.fetchDrinksListResults(searchText:searchText)
                }
            })
            .onSubmit(of: .search) {
                model.fetchDrinksListResults(searchText:searchText)
            }
    }
}

struct NoResultsView: View {
    var searchText: String
    var body: some View {
        VStack(spacing: 8, content: {
            Image(systemName: "magnifyingglass")
                .resizable()
                .scaledToFit()
                .frame(width: 200, height: 200)
            Text("No results found!")
                .bold()
                .font(.title)
        })
    }
}

#Preview {
    Search()
}
