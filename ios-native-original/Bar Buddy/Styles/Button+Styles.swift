//
//  Button+Styles.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/12/23.
//

import SwiftUI

struct FavoritesButtonStyle: ButtonStyle {
    
    func makeBody(configuration: Self.Configuration) -> some View {
        withAnimation(.bouncy(duration: 5.0)) {
            configuration.label
                .background(configuration.isPressed ? .clear : .blue)
                .foregroundColor(configuration.isPressed ? .blue : .white)
                .cornerRadius(16.0)
                .clipped()
        }
    }
}

#Preview {
    Button(action: {}, label: {
        HStack {
            Image(systemName: "star.fill")
            Text("Add to Favorites")
        }
        .padding()
    }).buttonStyle(FavoritesButtonStyle())
}
