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
    
    var tabs: some View {
        TabView {
            Popular().tabItem {
                Image(systemName: "wineglass")
                Text("Popular")
            }
            Faves().tabItem {
                VStack {
                    Image(systemName: "star")
                    Text("Faves")
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
                }
                NavigationLink {
                    Faves()
                } label: {
                    Image(systemName: "star")
                    Text("Faves")
                }
                NavigationLink {
                    Search()
                } label: {
                    Image(systemName: "magnifyingglass")
                    Text("Search")
                }
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
