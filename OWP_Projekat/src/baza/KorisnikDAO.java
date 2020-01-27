package baza;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.Korisnik;
import model.TipKorisnika;

public class KorisnikDAO {

	public static List<Korisnik> getAll() {
		List<Korisnik> korisnici = new ArrayList<>();

		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT korime, lozinka, datumRegistracije, uloga, aktivan "
					+ "FROM korisnici WHERE aktivan = 1";

			pstmt = conn.prepareStatement(query);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				int index = 1;
				String korime = rset.getString(index++);
				String lozinka = rset.getString(index++);
				String datumRegistracije = rset.getString(index++);
				TipKorisnika uloga = TipKorisnika.valueOf(rset.getString(index++));
				boolean aktivan = rset.getBoolean(index++);

				Korisnik kor = new Korisnik(korime, lozinka, datumRegistracije, uloga, aktivan);

				korisnici.add(kor);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				pstmt.close();
			} catch (Exception ex1) {
				ex1.printStackTrace();
			}
			try {
				rset.close();
			} catch (Exception ex1) {
				ex1.printStackTrace();
			}
			try {
				conn.close();
			} catch (Exception ex1) {
				ex1.printStackTrace();
			}
		}

		return korisnici;
	}
	
	public static Korisnik get(String korime, String password) throws Exception {
		Connection conn = ConnectionManager.getConnection();
		
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {

			String query = "SELECT datumRegistracije, uloga, aktivan FROM korisnici WHERE korime = ? AND lozinka = ? AND aktivan = 1";
			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, korime);
			pstmt.setString(index++, password);
			rset = pstmt.executeQuery();

			if (rset.next()) {
				String datumRegistracije = rset.getString(index++);
				TipKorisnika uloga = TipKorisnika.valueOf(rset.getString(index++));
				boolean aktivan = rset.getBoolean(index++);

				return new Korisnik(korime, password, datumRegistracije, uloga, aktivan);
			}
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return null;
	}
	
}
