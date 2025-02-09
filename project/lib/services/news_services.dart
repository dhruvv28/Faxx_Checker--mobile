import 'package:fact_checker/models/news_category.dart';

class NewsService {
  static Future<List<String>> getNewsByCategory(NewsCategory category) async {
    // Mock implementation
    await Future.delayed(const Duration(seconds: 1));
    
    switch (category) {
      case NewsCategory.sports:
        return [
          'Breaking: Local team wins championship in dramatic fashion',
          'New record set in international marathon',
          'Major trade deal shakes up professional league',
          'Rising star athlete signs groundbreaking contract',
        ];
      case NewsCategory.finance:
        return [
          'Stock market reaches new all-time high',
          'Cryptocurrency trends show promising future',
          'Major merger announced between tech giants',
          'Global economic forecast updated for Q2',
        ];
      case NewsCategory.politics:
        return [
          'Key legislation passes with bipartisan support',
          'International summit addresses climate change',
          'Local elections show record voter turnout',
          'New policy initiative announced for education',
        ];
      case NewsCategory.entertainment:
        return [
          'Anticipated blockbuster breaks box office records',
          'Award-winning series announces final season',
          'Music festival lineup revealed for summer',
          'Celebrity charity event raises millions',
        ];
      case NewsCategory.technology:
        return [
          'Revolutionary AI breakthrough in medical research',
          'New smartphone features game-changing technology',
          'Tech startup receives major investment',
          'Cybersecurity update addresses critical vulnerabilities',
        ];
      case NewsCategory.science:
        return [
          'Scientists discover new species in deep ocean',
          'Space mission reveals unexpected findings',
          'Breakthrough in renewable energy technology',
          'Climate research shows promising developments',
        ];
      default:
        throw Exception('Unknown category');
    }
  }
}
    