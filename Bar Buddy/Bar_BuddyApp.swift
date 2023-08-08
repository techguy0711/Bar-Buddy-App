//
//  Bar_BuddyApp.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/5/23.
//

import SwiftUI
import SwiftData

@main
struct Bar_BuddyApp: App {

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: Item.self)
    }
}
