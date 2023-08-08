//
//  Item.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/5/23.
//

import Foundation
import SwiftData

@Model
final class Item {
    var timestamp: Date
    
    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
