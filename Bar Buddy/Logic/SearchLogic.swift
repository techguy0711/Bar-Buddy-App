//
//  SearchLogic.swift
//  Bar Buddy
//
//  Created by Kristhian De Oliveira on 8/6/23.
//

import Foundation
import Combine

enum SearchState {
    case loading
    case failed
    case success(DrinksModelResponse)
}

class SearchLogic: ObservableObject {
    @Published var state: SearchState = .loading
    
    func fetchDrinksListResults(searchText: String) async {
        self.state = .loading
        let headers = [
            "X-RapidAPI-Key": "14fceb86d3msh2b904b3320f4859p16f048jsn9a135d9ccf8a",
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com"
        ]
        
        let request = NSMutableURLRequest(url: NSURL(string: "https://the-cocktail-db.p.rapidapi.com/search.php?s=\(searchText)")! as URL,
                                          cachePolicy: .useProtocolCachePolicy,
                                          timeoutInterval: 10.0)
        request.httpMethod = "GET"
        request.allHTTPHeaderFields = headers
        
        let session = URLSession.shared
        let task = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
            if (error != nil) {
                self.state = .failed
                print(error as Any)
            } else {
                guard let data = data else { return }
                if let decodedResponse = try? JSONDecoder().decode(DrinksModelResponse.self, from: data) {
                    self.state = .success(decodedResponse)
                }
            }
        })
        task.resume()
    }
}
