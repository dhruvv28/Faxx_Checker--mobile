import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:shimmer/shimmer.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Mock data for demonstration
    final checks = [
      {
        'query': 'Is the Earth flat?',
        'result': 'False. The Earth is an oblate spheroid.',
        'timestamp': DateTime.now().subtract(const Duration(hours: 2)),
      },
      {
        'query': 'Was the first moon landing in 1969?',
        'result': 'True. Apollo 11 landed on July 20, 1969.',
        'timestamp': DateTime.now().subtract(const Duration(days: 1)),
      },
    ];

  
    final isLoading = false;

    return isLoading ? _buildShimmerLoading() : _buildContent(checks);
  }

  Widget _buildShimmerLoading() {
    return Shimmer.fromColors(
      baseColor: Colors.grey[300]!,
      highlightColor: Colors.grey[100]!,
      child: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: 3, // Number of shimmer items to show
        itemBuilder: (context, index) {
          return Card(
            margin: const EdgeInsets.only(bottom: 8),
            child: ListTile(
              title: Container(
                width: double.infinity,
                height: 16,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 8),
                  Container(
                    width: double.infinity,
                    height: 14,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    width: 100,
                    height: 12,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ),
                ],
              ),
              isThreeLine: true,
            ),
          );
        },
      ),
    );
  }

  Widget _buildContent(List<Map<String, dynamic>> checks) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: checks.length,
      itemBuilder: (context, index) {
        final check = checks[index];
        return Card(
          margin: const EdgeInsets.only(bottom: 8),
          child: ListTile(
            title: Text(
              check['query'] as String,
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            subtitle: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 4),
                Text(check['result'] as String),
                const SizedBox(height: 4),
                Text(
                  (check['timestamp'] as DateTime).toString().split('.')[0],
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ],
            ),
            isThreeLine: true,
          ),
        ).animate().fadeIn(delay: (100 * index).ms).slideX();
      },
    );
  }
}