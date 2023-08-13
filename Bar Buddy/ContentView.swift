//
//  ContentView.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/5/23.
//

import SwiftUI
import SwiftData

struct ContentView: View {
    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    @State var selection: Int?

    var tabs: some View {
        TabView {
            Popular().tabItem {
                Image(systemName: "wineglass")
                Text("Popular")
            }
            Faves().tabItem {
                VStack {
                    Image(systemName: "star")
                    Text("Favorites")
                }
                
            }
            Search().tabItem {
                VStack {
                    Image(systemName: "magnifyingglass")
                    Text("Search")
                }
            }
        }
    }
    
    var sidebar: some View {
        NavigationView {
            List {
                NavigationLink {
                    Popular()
                } label: {
                    Image(systemName: "wineglass")
                    Text("Popular")
                }.tag("0")
                NavigationLink {
                    Faves()
                } label: {
                    Image(systemName: "star")
                    Text("Favorites")
                }.tag("1")
                NavigationLink {
                    Search()
                } label: {
                    Image(systemName: "magnifyingglass")
                    Text("Search")
                }.tag("2")
            }
        }
    }
    
    var body: some View {
            if UIDevice.current.userInterfaceIdiom == .phone {
                tabs
            } else {
                sidebar
            }
    }
}

    #Preview {
        ContentView()
    }
