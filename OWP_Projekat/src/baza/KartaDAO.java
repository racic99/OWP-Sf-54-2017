package baza;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import model.Karta;

public class KartaDAO {
	
	public static List<Karta> karteKorisnika(String korime) {
		List<Karta> karte = new ArrayList<>();

		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, projekcija, sediste, datumVremeProdaje, korisnik FROM karte WHERE korisnik = ?"
					+" ORDER BY datumVremeProdaje DESC";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++,korime);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
				int id = rset.getInt(index++);
				int projekcija = rset.getInt(index++);
				int sediste = rset.getInt(index++);
				String datumVreme = rset.getString(index++);

				Karta karta = new Karta(id, projekcija, sediste, datumVreme, korime);
				
				karte.add(karta);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return karte;
	}
	
	public static List<Karta> karteZaProjekciju(String idProjekcije) {
		List<Karta> karte = new ArrayList<>();

		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, projekcija, sediste, datumVremeProdaje, korisnik FROM karte WHERE projekcija = ?";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++,idProjekcije);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
				int id = rset.getInt(index++);
				int projekcija = rset.getInt(index++);
				int sediste = rset.getInt(index++);
				String datumVreme = rset.getString(index++);
				String korime = rset.getString(index++);

				Karta karta = new Karta(id, projekcija, sediste, datumVreme, korime);
				
				karte.add(karta);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return karte;
	}
	
	public static Karta get(String idKarte) {

		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();
		
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, projekcija, sediste, datumVremeProdaje, korisnik FROM karte WHERE id = ?";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, idKarte);

			rset = pstmt.executeQuery();
			
			int id = Integer.parseInt(idKarte);

			if (rset.next()) {
				index = 2;
				int projekcija = rset.getInt(index++);
				int sediste = rset.getInt(index++);
				String datumVreme = rset.getString(index++);
				String korisnik = rset.getString(index++);

				return new Karta(id, projekcija, sediste, datumVreme, korisnik);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return null;
	}
	
	public static List<Karta> getAll() {
		List<Karta> karte = new ArrayList<>();

		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT id, projekcija, sediste, datumVremeProdaje, korisnik FROM karte";

			pstmt = conn.prepareStatement(query);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				int index = 1;
				int id = rset.getInt(index++);
				int projekcija = rset.getInt(index++);
				int sediste = rset.getInt(index++);
				String datumVreme = rset.getString(index++);
				String korisnik = rset.getString(index++);

				Karta karta = new Karta(id, projekcija, sediste, datumVreme, korisnik);
				
				karte.add(karta);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return karte;
	}
	
	public static boolean brisanjeKarte(String idKarte) {
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		try {
			String query = "DELETE FROM karte WHERE id = ?";

			int index = 1;
			pstmt = conn.prepareStatement(query);
			pstmt.setString(index++, idKarte);

			return pstmt.executeUpdate() == 1;
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return false;
	}

}
