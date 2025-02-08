import 'package:flutter/material.dart';
import 'package:faxx_checker/screens/profile_screen.dart';
import 'package:faxx_checker/screens/search_screen.dart';
import 'package:faxx_checker/screens/categories_screen.dart';
import 'package:faxx_checker/screens/contact_screen.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            const CircleAvatar(
              backgroundImage: NetworkImage('https://i.pravatar.cc/150'),
              radius: 20,
            ),
            const SizedBox(width: 12),
            Text(
              'Chirag A',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                color: Theme.of(context).primaryColor,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.menu),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            _buildMenuButton(
              context,
              'Your Account',
              Icons.person,
              () => Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const ProfileScreen()),
              ),
            ),
            _buildMenuButton(
              context,
              'Theme',
              Icons.palette,
              () {
                // Theme functionality
              },
            ),
            _buildMenuButton(
              context,
              'Search in Real-time(Chat)',
              Icons.search,
              () => Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const SearchScreen()),
              ),
            ),
            _buildMenuButton(
              context,
              'Categories',
              Icons.category,
              () => Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const CategoriesScreen()),
              ),
            ),
            _buildMenuButton(
              context,
              'Contact Us',
              Icons.contact_support,
              () => Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const ContactScreen()),
              ),
            ),
            _buildMenuButton(
              context,
              'Buy Us a Coffee',
              Icons.coffee,
              () {
                // Coffee purchase functionality
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMenuButton(
    BuildContext context,
    String title,
    IconData icon,
    VoidCallback onTap,
  ) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: InkWell(
        onTap: onTap,
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16.0),
          decoration: BoxDecoration(
            color: Colors.grey[100],
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: Theme.of(context).primaryColor.withOpacity(0.3),
            ),
          ),
          child: Row(
            children: [
              Icon(icon, color: Theme.of(context).primaryColor),
              const SizedBox(width: 16),
              Text(
                title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const Spacer(),
              Icon(
                Icons.arrow_forward_ios,
                size: 16,
                color: Theme.of(context).primaryColor,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
