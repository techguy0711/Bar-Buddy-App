//
//  ListLoadingView.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/6/23.
//

import SwiftUI

struct ListLoadingView: View {
    var body: some View {
        ScrollView {
            VStack {
                Rectangle()
                    .shimmering(animation: .linear)
                    .padding()
                    .frame(height: 250)
                Rectangle()
                    .shimmering(animation: .linear)
                    .padding()
                    .frame(height: 250)
                Rectangle()
                    .shimmering(animation: .linear)
                    .padding()
                    .frame(height: 250)
                Rectangle()
                    .shimmering(animation: .linear)
                    .padding()
            }
        }    }
}

#Preview {
    ListLoadingView()
}
