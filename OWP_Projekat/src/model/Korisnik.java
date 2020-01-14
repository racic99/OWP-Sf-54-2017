package model;

public class Korisnik {

	private String korime;
	private String lozinka;
	private String datumRegistracije;
	private TipKorisnika uloga;
	private boolean aktivan;
	
	public Korisnik() {
		this.aktivan=true;
	}

	public Korisnik(String korime, String lozinka, String datumRegistracije, TipKorisnika uloga, boolean aktivan) {
		super();
		this.korime = korime;
		this.lozinka = lozinka;
		this.datumRegistracije = datumRegistracije;
		this.uloga = uloga;
		this.aktivan = aktivan;
	}

	public String getKorime() {
		return korime;
	}

	public void setKorime(String korime) {
		this.korime = korime;
	}

	public String getLozinka() {
		return lozinka;
	}

	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}

	public String getDatumRegistracije() {
		return datumRegistracije;
	}

	public void setDatumRegistracije(String datumRegistracije) {
		this.datumRegistracije = datumRegistracije;
	}

	public TipKorisnika getUloga() {
		return uloga;
	}

	public void setUloga(TipKorisnika uloga) {
		this.uloga = uloga;
	}

	public boolean isAktivan() {
		return aktivan;
	}

	public void setAktivan(boolean aktivan) {
		this.aktivan = aktivan;
	}
	
	
	
}
