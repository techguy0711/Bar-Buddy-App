//
//  FaveLogic.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/13/23.
//

import Foundation

enum FaveState {
    case loading
    case failed
    case success(Drink)
}

class DrinkDetailsLogic: ObservableObject {
    @Published var state: FaveState = .loading
    func fetchDrinkDetails(id:String) {
        state = .loading
        let headers = [
            "X-RapidAPI-Key": "14fceb86d3msh2b904b3320f4859p16f048jsn9a135d9ccf8a",
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com"
        ]

        let request = NSMutableURLRequest(url: NSURL(string: "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=\(id)")! as URL,
                                                cachePolicy: .useProtocolCachePolicy,
                                            timeoutInterval: 10.0)
        request.httpMethod = "GET"
        request.allHTTPHeaderFields = headers

        let session = URLSession.shared
        let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
            if (error != nil) {
                self.state = .failed
            } else {
                guard let data = data else { return }
                if let decodedResponse = try? JSONDecoder().decode(DrinksModelResponse.self, from: data) {
                    if let drink = decodedResponse.drinks.first {
                        self.state = .success(drink)
                    }
                }
            }
        })

        dataTask.resume()
    }
}
